<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div class="profile">
          <div class="text-center pb-4">
            <h2>User Profile</h2>
          </div>
          <div class="row">
            <div class="col-sm-6">
              <div class="form-group">
                <label>First Name:</label>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-group">
                <span>{{ store.getters['Auth/user'].first_name }}</span>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-6">
              <div class="form-group">
                <label>Last Name:</label>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-group">
                <span>{{ store.getters['Auth/user'].last_name }}</span>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-6">
              <div class="form-group">
                <label>Address:</label>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-group">
                <span>{{ store.getters['Auth/user'].address }}</span>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-6">
              <div class="form-group">
                <label>Phone:</label>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-group">
                <span>{{ store.getters['Auth/user'].phone }}</span>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-6">
              <div class="form-group">
                <label>Email:</label>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-group">
                <span>{{ store.getters['Auth/user'].email }}</span>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-6">
              <div class="form-group">
                <label>Birth Day:</label>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-group">
                <span>{{ store.getters['Auth/user'].date_of_birth }}</span>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-6">
              <div class="form-group">
                <label>ID:</label>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-group">
                <button class="btn btn-primary" @click.prevent="downloadFile(store.getters['Auth/user'].id_verification)">
                  <i class="fas fa-download"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>

import axios from "axios";

export default {
  name: "Profile",
  data() {
    return {
      profile: {
        firstName: 'John',
        lastName: 'Doe',
        address: '123 Main St, City',
        phone: '123-456-7890',
        email: 'john@example.com',
        id: '123456789'
      },
      // fileUrl: 'http://127.0.0.1:8000/storage/avatar/MXmlYibyzCtIR6fMCXMuevrWu6vxhodAWEVQ24u7.pdf',
      fileUrl: 'https://compote.slate.com/images/22ce4663-4205-4345-8489-bc914da1f272.jpeg?crop=1560%2C1040%2Cx0%2Cy0',
    };
  },
  computed: {
    store() {
      return this.$store;
    },
  },
  methods: {
    async downloadFile(filePath) {
      try {
        const filename = filePath.split('/').pop();
        console.log(filename)

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
</script>

<style scoped>
.profile {
  margin-top: 50px;
}
</style>