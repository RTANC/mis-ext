<template>
<v-container grid-list-md fill-height>
    <v-layout row wrap justify-center>
        <v-flex xs12 sm10 md10>
            <v-card>
                <v-card-title primary-title class="headline">
                    ตรวจสอบ Account
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md >
                        <template v-for="user in users">
                            <v-layout row wrap :key="user.userId">
                                <v-flex xs4>
                                    <p>{{ user.fullname }}</p>
                                </v-flex>
                                <v-flex xs4>
                                    <v-select :items="depts" v-model="user.deptId" label="ภาควิชา"></v-select>
                                </v-flex>
                                <v-flex xs4>
                                    <v-btn color="primary" @click="submit(user);">Submit</v-btn>
                                    <v-btn color="error">delete</v-btn>
                                </v-flex>
                            </v-layout>
                        </template>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
import api from '@/services/'
export default {
    name: 'Admin',
    data () {
        return {
            users: [],
            depts: [{
                value: 1,
                text: 'ภอศ.'
            }, {
                value: 2,
                text: 'ภพบ.'
            }, {
                value: 3,
                text: 'ภพฐ.'
            }, {
                value: 4,
                text: 'ภพก.'
            }, {
                value: 5,
                text: 'ภสศ.'
            }, {
                value: 6,
                text: 'ภอช.'
            }, {
                value: 7,
                text: 'ภสจ.'
            }]
        }
    },
    methods: {
        async listUsers () {
            try {
                const response = await api.listUsers()
                this.users = response.data
            } catch (error) {
                console.log(error)
            }
        },
        async submit (user) {
            try {
                await api.approveUser(user.userId, {
                    deptId: user.deptId
                })
                this.listUsers()
            } catch (error) {
                console.log(error)
            }
        },
        async deleteUser (user) {
            try {
                await api.deleteUser(user.userId)
                this.listUsers()
            } catch (error) {
                console.log(error)
            }
        }
    },
    beforeMount () {
        if (this.$store.getters.user.role != 0) {
            this.$router.push('/')
        } else {
            this.listUsers()
        }
    }
}
</script>
