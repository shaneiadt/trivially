<template>
  <div class="login">
    <div class="columns is-centered is-vcentered" style="height:100vh;">
      <div class="column is-one-third">
        <div class="box">
          <h1 class="title has-text-centered">Trivially</h1>
          <h2 class="subtitle has-text-centered">Be Socially Isolated</h2>
          <div class="field has-addons">
            <div class="control is-expanded">
              <input
                class="input"
                v-model="username"
                type="text"
                placeholder="Enter user name"
              />
            </div>
            <div class="control">
              <button
                :class="['button', username && 'is-primary']"
                title="Lock it in!"
                :disabled="username === ''"
                @click="createUser(username)"
              >
                Lock it in!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Login extends Vue {
  private username = "";

  @Prop() createUser!: Function;
}
</script>
