import axios from "axios";

export const dataService = {
    getUserData,
    uploadFile,
    deleteFile,

}

export const apiConfig = {
    endpointURL: "http://localhost:3001"
}

function getUserData() {

    const requestOption = {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    }
    return fetch(`${apiConfig.endpointURL}/getUserData`, requestOption).then(res => {
        //console.log(res.json()); 
        return res.json();
    })
}
function uploadFile(inputFile, userData, description) {
    const formData = new FormData();
    formData.append('inputFile', inputFile);
    formData.append('userName', userData);
    formData.append('description', description);
    console.log(`UserNAme: ${userData}, desc: ${description}`);
    const requestOption = {
        method: 'POST',
        body: formData,
       // headers: { "Content-Type": inputFile.type }
    }
    return fetch(`${apiConfig.endpointURL}/upload_file`, requestOption).then(res => {
      console.log(res);
        return res;
    })
}
function deleteFile(fileName,id) {
    const requestOption = {
        method: 'DELETE',
        body: JSON.stringify({
            "deleteFile": fileName,
            "userId": id
        }),
        headers: { "Content-Type": "application/json" }
    }
    return fetch(`${apiConfig.endpointURL}/delete_file`, requestOption)
}