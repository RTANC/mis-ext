<template>
<v-container grid-list-md fill-height>
    <v-layout row wrap>
        <v-flex xs12 v-if="(subjects.length === 0 ? true : false)">
            <v-alert type="info" :value="(subjects.length === 0 ? true : false)" transition="scale-transition" dismissible>
                ไม่มีข้อมูลรายวิชาในระบบ
            </v-alert>
        </v-flex>
        <template v-for="subject in subjects">
            <v-flex xs12 sm6 md4 :key="subject.subjectId">
                <v-card elevation="5">
                    <v-toolbar color="indigo darken-2" dark>
                        <v-toolbar-title>รายวิชา: {{ subject.name }}</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <p>หัวข้อ</p>
                        <ul>
                            <template v-for="topic in subject.topics">
                                <li :key="topic.topicId">
                                    {{ topic.name }}
                                </li>
                            </template>
                        </ul>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat icon color="success">
                            <v-icon>help</v-icon>
                        </v-btn>
                        <v-btn flat icon color="warning" @click="openDialogInEdit(subject);">
                            <v-icon>create</v-icon>
                        </v-btn>
                        <v-btn color="error" icon flat @click="deleteSubject(subject.subjectId);">
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </template>
        <v-flex xs12 sm12 md12>
            <v-btn color="pink" dark fixed button right fab @click="dialog = true">
                <v-icon>add</v-icon>
            </v-btn>
        </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" scrollable persistent max-width="700px" transition="scale-transition">
        <v-card>
            <v-card-title primary-title>
                <p class="title">จัดการข้อมูลรายวิชา</p>
                <v-spacer></v-spacer>
                <v-btn color="gray" icon flat @click="clear">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-form v-model="valid" ref="form" lazy-validation>
                    <v-container grid-list-md>
                        <v-layout row wrap>
                            <v-flex xs12>
                                <p>รายวิชา</p>
                            </v-flex>
                            <v-flex xs9>
                                <v-text-field name="subject[name]" label="ชื่อรายวิชา" v-model="subject.name"></v-text-field>
                            </v-flex>
                            <v-flex xs3>
                                <v-btn color="green" fab flat icon small v-if="subject.subjectId == null" @click="createSubject">
                                    <v-icon>save</v-icon>
                                </v-btn>
                                <v-btn color="warning" fab flat icon small v-else @click="updateSubject">
                                    <v-icon>create</v-icon>
                                </v-btn>
                            </v-flex>
                            <v-flex xs12>
                                <p>หัวข้อ</p>
                            </v-flex>
                            <v-flex xs9>
                                <v-text-field label="ชื่อหัวข้อ" v-model="topic.name" :disabled="subject.subjectId == null"></v-text-field>
                            </v-flex>
                            <v-flex xs3>
                                <v-btn color="pink" fab flat icon small @click="createTopic" :disabled="subject.subjectId == null">
                                    <v-icon>add</v-icon>
                                </v-btn>
                            </v-flex>
                        </v-layout>
                        <template v-for="topic in subject.topics">
                            <v-layout row wrap :key="topic.topicId">
                                <v-flex xs9>
                                    <v-text-field label="ชื่อหัวข้อ" v-model="topic.name"></v-text-field>
                                </v-flex>
                                <v-flex xs3>
                                    <v-btn color="warning" fab flat icon small @click="updateTopic(topic);">
                                        <v-icon>create</v-icon>
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </template>
                    </v-container>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import api from '@/services/'
export default {
    name: 'Subject',
    data () {
        return {
            dialog: false,
            valid: false,
            subject: {
                subjectId: null,
                name: null,
                topics: []
            },
            topic: {
                topicId: null,
                name: null
            },
            subjects: []
        }
    },
    methods: {
        async getSubjects () {
            try {
                const subjects = await api.getSubjects()
                this.subjects = subjects.data
            } catch (error) {
                console.log(error)
            }
        },
        async createSubject () {
            try {
                const subject = await api.createSubject(this.subject.name)
                this.subject.subjectId = subject.data.subjectId
                this.subject.name = subject.data.name
            } catch (error) {
                console.log(error)
            }
        },
        async updateSubject () {
            try {
                await api.updateSubject(this.subject.subjectId, this.subject.name)
            } catch (error) {
                console.log(error)
            }
        },
        deleteSubject (sid) {
            
        },
        async createTopic () {
            try {
                const response = await api.createTopic(this.subject.subjectId, this.topic.name)
                const topic = {
                    topicId: response.data.topicId,
                    name: response.data.name
                }
                this.subject.topics.unshift(topic)
                this.$refs.form.inputs[1].reset()
            } catch (error) {
                console.log(error)
            }
        },
        async updateTopic (topic) {
            try {
                await api.updateTopic(this.subject.subjectId, topic.topicId, topic.name)
            } catch (error) {
                console.log(error)
            }
        },
        openDialogInEdit (subject) {
            this.subject = subject
            this.dialog = true
        },
        clear () {
            this.$refs.form.reset();
            this.subject = {
                subjectId: null,
                name: null,
                topics: []
            }
            this.topic = {
                topicId: null,
                name: null
            }
            this.getSubjects()
            this.dialog = false;
        }
    },
    beforeMount () {
        if (this.$store.getters.user === null) {
            this.$router.push('Signin')
        } else {
            //GET Subject
            this.subjects = [{
                subjectId: 1,
                name: 'เทคโนโลยีเพื่อการศึกษา',
                topics: [{
                    topicId: 1,
                    name: 'การเลือกใช้เทคโนโลยีให้เหมาะสม'
                }, {
                    topicId: 2,
                    name: 'การใช้เทคโนโลยีเพื่อเการรียนรู้ด้วยตนเอง'
                }]
            }, {
                subjectId: 2,
                name: 'เทคโนโลยีเพื่อการวิจัย',
                topics: [{
                    topicId: 3,
                    name: 'การเลือกใช้เทคโนโลยีให้เหมาะสมแก่การทำวิจัย'
                }, {
                    topicId: 4,
                    name: 'การใช้เทคโนโลยีเพื่อสืบค้นงานวิจัย'
                }]
            }]
            this.getSubjects()
        }
    }
}
</script>
