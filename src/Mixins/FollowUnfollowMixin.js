import axios from "axios";
import {mapActions} from "vuex";

export const FollowUnfollowMixin = {
  computed: {
    store() {
      return this.$store;
    },
  },
  methods: {
    ...mapActions({
      user: 'Auth/getAuthInfo'
    }),
    setUserInfo() {
      this.user(this.$store.state["Auth/token"]).then(() => {
      })
    },
    toggleFollow(follower) {
      follower.is_followed_by_auth_user = ! follower.is_followed_by_auth_user
    },
    unFollow(follower) {
      this.toggleFollow(follower)
      axios.post(`unfollow/${follower.id}`).then(() => {
        this.setUserInfo();
      }).catch(({response}) =>{
        this.errors = response.data.errors;
      })
    },
    follow(follower) {
      this.toggleFollow(follower)
      axios.post(`follow/${follower.id}`).then(() => {
        this.setUserInfo();
      }).catch(({response}) =>{
        this.errors = response.data.errors;
      })
    }
  }
}