const deleteData= () =>{
    const id = document.getElementById("postId").value;

    fetch(`${API_URL}/${id}`,{
        method:"DELETE"
    }).then(response => {
        if(!response.ok){
            throw new Error (`HTTP error stado: ${response.status}`);
        }
        showResult({
            message:"Post con el id 1 eliminado",
            status:response.status
        });
        
    }).catch(error => showResult(error.message, true));
}