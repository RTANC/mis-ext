<template>
<v-container grid-list-md fill-height>
    <v-layout row wrap justify-center>
        <v-flex xs12 sm10 md10>
            <v-card>
                <v-card-title primary-title class="headline">ลงทะเบียนผู้ใช้ใหม่</v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout row wrap justify-center>
                            <v-flex xs12 sm3 md3>
                                <v-avatar size="69">
                                    <img :src="$store.getters.user.avatar">
                                </v-avatar>
                            </v-flex>
                        </v-layout>
                        <v-form v-model="valid" ref="form">
                            <v-layout row wrap justify-center>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="fullname" label="ชื่อ-นามสกุล" readonly></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="email" label="Email" readonly></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-select :items="roles" v-model="role" label="บทบาทของผู้ใช้" :rules="[v => !!v || 'กรุณาเลือกบทบาทผู้ใช้']" required></v-select>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="stdId" label="เลขประจำตัวนักเรียน" v-if="role == 2" :rules="[v => !!v || 'กรุณากรอกเลขประจำตัวนักเรียน', v => /^(\d){5}$/.test(v) || 'เลขประจำตัวนักเรียนไม่ถูกต้อง']" required></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-form>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" :disabled="!valid" @click="register">ลงทะเบียน</v-btn>
                    <v-btn @click="signOut();">ยกเลิก</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
        <v-dialog v-model="dialog" persistent max-width="290">
            <v-card>
                <v-card-title primary-title class="headline">
                    {{card.title}}
                </v-card-title>
                <v-card-text>
                    {{card.text}}
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn :color="card.color" @click="(card.color == 'primary' ? signOut() : dialog = false)">ทราบ</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</v-container>
</template>

<script>
import api from '@/services'
export default {
    name: 'Register',
    data () {
        return {
            valid: false,
            dialog: false,
            fullname: this.$store.getters.user.fullname,
            email: this.$store.getters.user.email,
            role: null,
            roles: [{
                value: 1,
                text: 'อาจารย์'
            }, {
                value: 2,
                text: 'นักเรียนพยาบาล'
            }],
            stdId: null,
            card: {
                color: null,
                title: null,
                text: null
            }
        }
    },
    methods: {
        async register () {
            try {
                const user = await api.register({
                    role: this.role,
                    stdId: (this.role == 1) ? null : this.stdId
                }, this.$store.getters.user.id_token)
                if (user.data.role == 1) {
                    this.card.title = 'แจ้งทราบ'
                    this.card.text = 'ลงทะเบียน Account สำเร็จ, รอการตรวจสอบจากผู้ดูแลระบบ'
                    this.card.color = 'primary'
                } else {
                    this.card.title = 'แจ้งทราบ'
                    this.card.text = 'ลงทะเบียน Account สำเร็จ, กรุณา Login ใหม่อีกครั้ง'
                    this.card.color = 'primary'
                }
            } catch (error) {
                console.log(error)
                this.card.title = 'ล้มเหลว'
                this.card.text = 'ลงทะเบียน Account ล้มเหลว, กรุณาลองใหม่อีกครั้ง หรือติดต่อผู้ดูแลระบบ'
                this.card.color = 'error'
            } finally {
                this.dialog = true
            }
        },
        signOut () {
            this.dialog = false
            var auth2 = gapi.auth2.getAuthInstance()
            auth2.signOut().then(x => {
                this.$store.dispatch('signout')
                this.$router.push('/')
            }).catch(error => {
                console.log(error)
            })
        }
    }
}
</script>
