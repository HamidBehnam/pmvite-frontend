import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { catchError, tap } from 'rxjs/operators';
import { MembersStore } from './members.store';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Member } from '../../../shared/types/member.model';
import { ProjectsStore } from '../../projects/state/projects.store';
import { ProjectsQuery } from '../../projects/state/projects.query';
import { MembersGETRequestMeta } from '../../../shared/types/members-get-meta.type';
import { RequestMetaFormat } from '../../../shared/types/request-meta-format.type';
import { MembersQuery } from './members.query';

@Injectable({ providedIn: 'root' })
export class MembersService {

  constructor(private membersStore: MembersStore,
              private membersQuery: MembersQuery,
              private projectsStore: ProjectsStore,
              private projectsQuery: ProjectsQuery,
              private http: HttpClient) {
  }

  private static membersGETParamsExtractor(membersGETRequestMeta: Partial<MembersGETRequestMeta>): RequestMetaFormat {
    return {
      ...membersGETRequestMeta.sort && {sort: membersGETRequestMeta.sort},
      ...membersGETRequestMeta.limit && {limit: membersGETRequestMeta.limit},
      ...membersGETRequestMeta.page && {page: membersGETRequestMeta.page},
      ...membersGETRequestMeta.role && {'role[]': membersGETRequestMeta.role}
    };
  }

  private static membersGETHeadersExtractor(membersGETRequestMeta: Partial<MembersGETRequestMeta>): RequestMetaFormat {
    return {
      ...membersGETRequestMeta.projectId && {projectId: membersGETRequestMeta.projectId},
      ...membersGETRequestMeta.userId && {userId: membersGETRequestMeta.userId},
    };
  }

  getMembers(membersGETRequestMeta?: Partial<MembersGETRequestMeta>): Observable<Member[]> {

    let params: RequestMetaFormat = {};
    let headers: RequestMetaFormat = {};

    if (membersGETRequestMeta) {
      params = MembersService.membersGETParamsExtractor(membersGETRequestMeta);
      headers = MembersService.membersGETHeadersExtractor(membersGETRequestMeta);
    }

    return this.http.get<Member[]>(`${environment.apiUrl}/members`, {
      params,
      headers
    })
      .pipe(
        tap(members => this.membersStore.set(members))
      );
  }

  updateMember(memberId: string, payload: Partial<Member>): Observable<Member> {
    const backupMember = this.membersQuery.getEntity(memberId);
    this.updateMemberInStore(memberId, payload);

    return this.http.patch<Member>(`${environment.apiUrl}/members/${memberId}`, payload)
      .pipe(
        catchError(error => {
          this.updateMemberInStore(memberId, backupMember as Member);
          return throwError(error);
        })
      );
  }

  updateMemberInStore(memberId: string, payload: Partial<Member>): void {
    this.membersStore.update(memberId, payload);
  }

  deleteMember(memberId: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/members/${memberId}`)
      .pipe(
        tap(_ => {
          this.membersStore.remove(memberId);
          const selectedProject = this.projectsQuery.getValue().selectedProject;
          if (selectedProject) {
            this.projectsStore.update({
              selectedProject: {
                ...selectedProject,
                members: selectedProject.members.filter(member => member !== memberId)
              }
            });
          }
        })
      );
  }

  createMember(payload: Partial<Member>): Observable<Member> {
    return this.http.post<Member>(`${environment.apiUrl}/members`, payload)
      .pipe(
        tap(member => {
          const selectedProject = this.projectsQuery.getValue().selectedProject;
          this.membersStore.add(member);
          if (selectedProject) {
            this.projectsStore.update({
              selectedProject: {
                ...selectedProject,
                members: [
                  ...selectedProject.members,
                  member._id
                ]
              }
            });
          }
        })
      );
  }
}
