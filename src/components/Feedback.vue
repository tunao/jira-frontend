<template>
  <div>
    <input type="file" id="file-input" name="file-input" @change="handleFileChange"/>
    <label id="file-input-label" for="file-input">Select a File</label>
    <v-data-table
        :headers="tableHeaders"
        :items="feedback"
    >
      <template v-slot:headers="props">
        <tr>
          <td v-for="(value, index) in props.item" :key="index">{{ value }}</td>
        </tr>

      </template>
      <template v-slot:items="props">
        <tr>
          <td v-for="(value, index) in props.item" :key="index">{{ value }}</td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>

import ExcelJS from 'exceljs';
import axios from "axios";
import IssueService from "@/services/IssueService";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Feedback",
  data() {
    return {
      excelData: [],
      tableHeaders: [],
      feedback: []
    }
  },
  methods: {
    async handleFileChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = async event => {
        const data = new Uint8Array(event.target.result);
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(data);
        const worksheet = workbook.getWorksheet(1); // Adjust as needed
        const excelData = [];
        const headers = worksheet.getRow(1).values;
        this.tableHeaders = headers;
        console.log(this.tableHeaders)
        worksheet.eachRow((row, rowNumber) => {
          if (rowNumber !== 1) {
            const rowData = row.values;
            excelData.push(rowData);
          }
        });
        this.excelData = excelData;
        console.log(this.excelData)
        const response = await axios.post('http://localhost:8081/save_excel_data', {data: this.excelData});
        console.log(response.data.message);
      };
      reader.readAsArrayBuffer(file);
      this.$router.go();
    },
    getFeedback() {
      IssueService.getFeedback().then((response) => {
        console.log(response.data)
        this.feedback = response.data
      })
    },
  },
  created() {
    this.getFeedback()
  },
}
</script>

<style scoped>

#file-input-label {
  font-size: 1.3em;
  padding: 10px 15px;
  border: 1px solid black;
  border-radius: 4%;
}

#file-input {
  display: none;
}

</style>