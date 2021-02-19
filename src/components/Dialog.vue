<template>
  <v-container>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent @input="compare">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on">להשוואה</v-btn>
        </template>
        <v-card>
          <v-layout row wrap>
            <v-flex md6>
              <v-card class="ml-10 mt-10" style="background-color: #CAE4FF">
                <v-card-title
                  style="font-family: 'Assistant', sans-serif; font-size: 15px"
                  class="justify-center"
                >
                  {{ selected[0].Law }}
                </v-card-title>
                <v-card-text
                  style="font-size: 30px; line-height: 1.5"
                  ref="display1"
                >
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex md6>
              <v-card class="ml-10 mt-10" style="background-color: #CAE4FF">
                <v-card-title
                  style="font-family: 'Assistant', sans-serif; font-size: 15px"
                  class="justify-center"
                >
                  {{ selected[1].Law }}
                </v-card-title>
                <v-card-text
                  style="font-size: 30px; line-height: 1.5"
                  ref="display2"
                >
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
          <br />
          <v-btn color="primary" @click="dialog = false" width="100">
            סגירה
          </v-btn>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
const Diff = require('diff');
export default {
  name: 'Dialog',
  data() {
    return {
      selected: JSON.parse(localStorage.getItem('selected')),
      dialog: false,
    };
  },
  mounted() {
    // console.log('@@@', this.$refs);
    // console.log(
    //   Diff.diffWords(this.selected[0].Description, this.selected[1].Description)
    // );
    // let span1 = null;
    // let span2 = null;
    // const diff = Diff.diffWords(
    //   this.selected[0].Description,
    //   this.selected[1].Description
    // );
    // //   display1 = document.getElementById('display1'),
    // const display1 = this.$refs.display1;
    // const display2 = this.$refs.display2;
    // // const display2 = document.getElementById('display2');
    // const fragment1 = document.createDocumentFragment();
    // const fragment2 = document.createDocumentFragment();
    // console.log(display1);
    // diff.forEach((part) => {
    //   let color = '';
    //   // green for additions, red for deletions
    //   // grey for common parts
    //   if (!part.added && !part.removed) {
    //     color = 'grey';
    //     span1 = document.createElement('span1');
    //     span1.style.color = color;
    //     span1.appendChild(document.createTextNode(part.value.replace(';', '')));
    //     span2 = document.createElement('span2');
    //     span2.style.color = color;
    //     span2.appendChild(document.createTextNode(part.value.replace(';', '')));
    //     fragment1.appendChild(span1);
    //     fragment2.appendChild(span2);
    //   }
    //   if (part.removed && part.added === undefined) {
    //     color = 'red';
    //     span1 = document.createElement('span1');
    //     span1.style.color = color;
    //     span1.appendChild(document.createTextNode(part.value.replace(';', '')));
    //     fragment1.appendChild(span1);
    //   }
    //   if (part.added && part.removed === undefined) {
    //     color = 'green';
    //     span2 = document.createElement('span2');
    //     span2.style.color = color;
    //     span2.appendChild(document.createTextNode(part.value.replace(';', '')));
    //     fragment2.appendChild(span2);
    //   }
    // });
    // display1.appendChild(fragment1);
    // display2.appendChild(fragment2);
  },
  methods: {
    backToSearch() {
      this.$router.go(-1);
    },
    compare() {
      console.log(
        Diff.diffWords(
          this.selected[0].Description,
          this.selected[1].Description
        )
      );
      let span1 = null;
      let span2 = null;

      const diff = Diff.diffWords(
        this.selected[0].Description,
        this.selected[1].Description
      );
      //   const display1 = document.getElementById('display1');
      //   const display1 = this.$refs.display1;
      const display2 = this.$ref.display2;
      const display1 = this.$ref.display1;
      // const display2 = document.getElementById('display2');
      const fragment1 = document.createDocumentFragment();
      const fragment2 = document.createDocumentFragment();

      console.log(display1);

      diff.forEach((part) => {
        let color = '';
        // green for additions, red for deletions
        // grey for common parts
        if (!part.added && !part.removed) {
          color = 'grey';
          span1 = document.createElement('span1');
          span1.style.color = color;
          span1.appendChild(
            document.createTextNode(part.value.replace(';', ''))
          );
          span2 = document.createElement('span2');
          span2.style.color = color;
          span2.appendChild(
            document.createTextNode(part.value.replace(';', ''))
          );
          fragment1.appendChild(span1);
          fragment2.appendChild(span2);
        }
        if (part.removed && part.added === undefined) {
          color = 'red';
          span1 = document.createElement('span1');
          span1.style.color = color;
          span1.appendChild(
            document.createTextNode(part.value.replace(';', ''))
          );
          fragment1.appendChild(span1);
        }
        if (part.added && part.removed === undefined) {
          color = 'green';
          span2 = document.createElement('span2');
          span2.style.color = color;
          span2.appendChild(
            document.createTextNode(part.value.replace(';', ''))
          );
          fragment2.appendChild(span2);
        }
      });
      display1.appendChild(fragment1);
      display2.appendChild(fragment2);
    },
  },
};
</script>
