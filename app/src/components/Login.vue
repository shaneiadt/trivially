<template>
  <div class="login">
    <div class="columns is-centered is-vcentered" style="height:100vh;">
      <div class="column is-one-third">
        <div class="box">
          <h1 class="title has-text-centered logo">Trivially</h1>
          <h2 class="subtitle has-text-centered">Be Socially Isolated</h2>
          <div class="field has-addons">
            <div class="control is-expanded">
              <input
                ref="loginInput"
                class="input"
                v-model="username"
                type="text"
                @keypress.enter="createUser(username)"
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
import { Vue, Component, Prop, Ref } from "vue-property-decorator";

@Component
export default class Login extends Vue {
  private username = "";

  @Prop() createUser!: Function;
  @Ref() readonly loginInput!: HTMLInputElement;

  mounted(): void {
    const input = this.$refs.loginInput as HTMLInputElement;
    input.focus();
  }
}
</script>

<style>
.logo {
  text-transform: uppercase;
	background: linear-gradient(to right, #30CFD0 0%, #330867 100%);
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
  font-size: 3em;
}
</style>
