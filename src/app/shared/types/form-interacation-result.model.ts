export interface FormInteractionResult<T> {
  id: string;
  payload: Partial<T>;
  storePayload?: Partial<T>;
}
