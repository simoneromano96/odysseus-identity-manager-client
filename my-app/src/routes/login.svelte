<script lang="ts">
	import Paper, { Title, Subtitle, Content } from "@smui/paper"
	import Textfield from "@smui/textfield"
	import { Icon, Label } from "@smui/common"
	// import HelperText from '@smui/textfield/helper-text';
	import Button from "@smui/button"
	import { form as formValidator, bindClass } from "svelte-forms"
  import { onMount, afterUpdate } from 'svelte';

	let email = ""

  let loginForm;

  let invalidEmail = false;

  onMount(() => {
    loginForm = formValidator(() => ({
      email: { value: email, validators: ["required", "email"] }
    }), {
      validateOnChange: false,
      initCheck: false,
    });
  });

  afterUpdate(() => {
    loginForm.validate();
    invalidEmail = $loginForm?.fields?.email?.dirty && !$loginForm?.fields?.email?.valid;
  });
</script>

<div class="login">
	<Paper class="paper">
		<Title>Login</Title>
		<Subtitle>Here you can login into Odysseus.</Subtitle>
		<Content>
			<form class="login-form">
				<Textfield bind:value={email} label="Email" type="email" required bind:invalid={invalidEmail}>
					<div slot="helper">Your registered e-mail</div>
					<Icon class="material-icons" slot="leadingIcon">mail</Icon>
				</Textfield>

				<Button>
					<Label>Submit</Label>
				</Button>
			</form>
		</Content>
	</Paper>
</div>

<style lang="sass">
.login 
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  height: 100%

.login-form
  min-width: 50vw
  display: flex
  flex-flow: column
</style>
