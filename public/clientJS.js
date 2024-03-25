$('#patientSearchForm').on('submit', async (e)=>{
    e.preventDefault()

    if($('#birthdate').val()){
        let patients
        try{
            let date = new Date($('#birthdate').val())
            let correctDate = new Date(
                date.getUTCFullYear(),
                date.getUTCMonth(),
                date.getUTCDate(),
            )

            console.log(correctDate.toLocaleDateString())
            let patientsFetch = await fetch('/searchPatients',{
                method:"POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                    birthdate: correctDate
                    }
                )
            })
            patients = await patientsFetch.json()
            let list = patients.map(x=>`<li> <a href='${'/patient/' + x._id}'>${x.firstName} ${x.lastName}</li>`)

            console.log(list.join(''))

            $('#results').html(String(list.join('')))
        }catch(e){}
        
        
    }else{
        
    }
})