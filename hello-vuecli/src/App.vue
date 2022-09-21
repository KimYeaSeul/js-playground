<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <strong
      ><!--</strong><HelloWorld msg="Welcome to Your Vue.js App"/><strong>--></strong
    >
    <strong
      ><editor
        api-key="i68a9ozqm35qgdhn2h6butkhi3om9irmmyy4mwddekj33law"
        init="{plugins: 'wordcount'}"
        initial-value="TinyMCE has landed!"
      ></editor
    ></strong>
  </div>
</template>

<script>
<strong>//</strong>import HelloWorld from './components/HelloWorld.vue';
<strong>import Editor from '@tinymce/tinymce-vue'</strong>

export default {
  name: 'app',
  components: {
    <strong>//</strong>HelloWorld,
    <strong>'editor': Editor</strong>
  }
}
</script>
