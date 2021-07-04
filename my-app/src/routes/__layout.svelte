<TopAppBar
variant="static"
color='primary'
>
<Row>
  <Section>
    <IconButton class="material-icons">menu</IconButton>
    <Title>Odysseus identity manager</Title>
  </Section>
  <Section align="end" toolbar>
    <IconButton class="material-icons" aria-label="Download"
      >file_download</IconButton
    >
    <IconButton class="material-icons" aria-label="Print this page"
      >print</IconButton
    >
    <IconButton class="material-icons" aria-label="Bookmark this page"
      >bookmark</IconButton
    >
  </Section>
</Row>
</TopAppBar>

<main class="page-container">
  <slot />
</main>

<script>
  import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
  import IconButton from '@smui/icon-button';
</script>

<style lang="sass">
main.page-container
  padding: 1rem
</style>