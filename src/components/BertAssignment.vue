<template>
    <div>
        <h1>Feedback speichern und klassifizieren</h1>
        <textarea v-model="feedback" placeholder="Geben Sie Ihr Feedback ein"></textarea>
        <button @click="saveAndClassifyFeedback">Speichern & Klassifizieren</button>
        <p v-if="classificationResult">{{ classificationResult }}</p>

        <v-btn>Select Issues</v-btn>

        <v-btn>Select Feedback</v-btn>

        <v-data-table
                :headers="headers"
                :items="feedback"
        >

        </v-data-table>
    </div>

</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            feedback: '',
            classificationResult: '',
            headers: [
                {text: "Feedback", value: null},
                {text: "Issues", value: null},
            ],
        };
    },
    methods: {
        async saveAndClassifyFeedback() {
            try {
                const response = await axios.post('http://localhost:5000/save-feedback', {
                    feedback: this.feedback
                });
                this.classificationResult = response.data.message;
                this.feedback = ''; // Leere das Textfeld
            } catch (error) {
                console.error('Fehler bei der Kommunikation mit der API:', error);
            }
        }
    }
};
</script>
