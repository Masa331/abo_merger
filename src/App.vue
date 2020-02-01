<template>
  <body>
    <header>
      <nav>
        <h1>ABO Fiddler</h1>
        <input type="file" accept=".txt,.gpc" multiple="true" v-on:change="uploadFile"/>
      </nav>

      <!-- <section> -->
      <!-- </section> -->

    </header>

    <main>
        <div v-for="file in files">
          <AboFile :file="file"/>
        </div>
    </main>
  </body>
</template>

<script>
import AboFile from './components/AboFile.vue'

export default {
  name: 'app',
  data: function initData() {
    return { files: [] }
  },
  methods: {
    parseAboFile(text) {
      const headers = [];
      const transactions = [];

      return text;

      return { headers, transactions };
    },
    uploadFile(event) {
      event.target.files.forEach((file) => {
        file.text().then((text) => {
          const parsed = this.parseAboFile(text);
          this.files.push(parsed);
        });
      });
    }
  },
  components: {
    AboFile
  }
}
</script>
