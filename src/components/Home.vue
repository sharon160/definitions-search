<template>
  <v-container>
    <h1 style="font-size: 40px; color: #1A237E">ברוכים הבאים</h1>
    <h3>
      כמעט בכל חוק ישנם סעיפי הגדרות שמטרתם להגדיר מושגים שונים החוזרים לאורך
      דבר החקיקה הספציפי. חוקים שונים מגדירים מושגים שונים באופנים שונים,
      המתאימים לתחום התוכן שאליו מתייחסים.
    </h3>
    <br />
    <h3>
      הדיגיטציה של כלל החקיקה התקפה, תוך תיוג ההגדרות בצורה עקבית, מאפשרת לנו
      לראשונה מבט רוחבי על עולם ההגדרות בחקיקה, על מנת לייצר כלים למשפטנים
      לבדיקה רוחבית של שימוש בהגדרה מסוימת בחוקים שונים, מחקר על ההתפתחות של
      שימוש בהגדרות לאורך השנים, ותועלות נוספות.
    </h3>
    <br />
    <h2>
      מטרת פרויקט זה היא להנגיש לכם את חיפוש ההגדרות בחקיקה.
    </h2>
    <h2>באתר תוכלו לחפש הגדרה בקלות וביעילות.</h2>
    <br />
    <v-layout row wrap justify-center>
      <v-flex md2>
        <v-btn to="/about" color="primary">למדריך שימוש באתר לחצו כאן</v-btn>
      </v-flex>
      <v-flex md3>
        <v-btn
          href="https://github.com/sharon160/definitions-search"
          color="primary"
          >קישור ל-github
          <v-icon class="pr-2">mdi-github</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <br />

    <v-img
      src="../assets/law_image.jpg"
      max-height="200"
      max-width="300"
      class="mx-auto"
    ></v-img>
  </v-container>
</template>

<script>
export default {
  name: 'About',

  data() {
    return {};
  },
  mounted() {
    localStorage.clear();
  },
};
</script>
