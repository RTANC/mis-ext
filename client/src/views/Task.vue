<template>
  <v-container grid-list-md fluid fill-height>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            ภาพรวมโครงการ
            <v-select
              :items="years"
              v-model="year"
              label="ปีงบประมาณ"
            ></v-select>
          </v-card-title>
          <v-card-text>
            
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import api from '@/services'

export default {
  name: 'Task',
  data () {
    return {
      years: [2562,2561,2560,2559,2558,2557,2556,2555],
      year: 2560,
    }
  },
  methods: {
  }
}
</script>