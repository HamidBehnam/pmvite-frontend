class ConfigProvider {
  private readonly QUILL_CONFIG: any;

  constructor() {
    this.QUILL_CONFIG = {
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],

          [{ header: 1 }, { header: 2 }],               // custom button values

          [{ list: 'ordered'}, { list: 'bullet' }],
          [{ indent: '-1'}, { indent: '+1' }],          // outdent/indent

          [{ align: [] }],

          ['clean'],                                         // remove formatting button

          ['link', 'image', 'video']                         // link and image, video
        ]
      }
    };
  }

  get quillConfig(): any {
    return this.QUILL_CONFIG;
  }
}

export const configProvider = new ConfigProvider();
