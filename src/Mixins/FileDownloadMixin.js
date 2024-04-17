import axios from "axios";

export const FileDownloadMixin = {
  methods: {
    async downloadFile(filePath) {
      try {
        const filename = filePath.split('/').pop();

        const response = await axios.get(`/download-file/${filename}`, {
          responseType: 'blob',
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error downloading file:', error);
      }
    }
  }
}