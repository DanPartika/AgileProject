
$(document).ready(function () { 
    $('#loadData').live("click", () => {
        console.log("load")
        $('#firstClick').click();
    })
})

function randomArray(length){
    let arr = []
    for (let i = 0; i < length; i++){
        num = Math.random()
        if (num < .90){
            num/=10
        }else{
            num = Math.random()
        }
        arr.push(num)
    }
    return arr
}

window.onload = function() {
    let elems = [...Array(50).keys()]

    var dataBrain = {}

    elems.map(x=>{dataBrain[x] = {}; dataBrain[x].data = []; dataBrain[x].vals = []})


    let dataRAW = $('#chartContainer').attr("data-eeg")
    let data = JSON.parse(dataRAW)


    numRecordings = data.length

    for(let i = 0; i < numRecordings; i++){
        for(let j = 0; j < data[0].length; j++){
            dataBrain[j].data.push(data[i][j])
        }
    }

    
    var chart = new CanvasJS.Chart("chartContainer", {
        theme: "light2",
        title: {
            text: "EEG Data"
        },
        data: elems.map(x=>{return{
            type: "line",
            dataPoints: dataBrain[x].vals
        }})
        // [
        // {
        //     type: "line",
        //     dataPoints: dataPoints
        // },
        // {
        //     type: "line",
        //     dataPoints: dataPoints1
        // },
        // ]
    });
    updateData();
    
    // Initial Values
    var xValue = 0;
    var yValue = 10;
    var newDataCount = 1;
    
    function addData(data) {
        let averageResponse = 0

        for(let j = 0; j < elems.length; j++){
            dataBrain[j].vals.push({x: xValue, y: dataBrain[j].data[xValue]})
            if(xValue > 250){
                dataBrain[j].vals.shift()
            }
            averageResponse += dataBrain[j].data[xValue]
        }
        
        averageResponse/=elems.length

        $('#data-range-max').val(averageResponse*50)
        // $('#clamp_range').val(true)
        $('#clamp_range').prop("checked", !$('#clamp_range').prop("checked"))
        
            
        xValue++;
        yValue = parseInt(data[0][1]);
        
        newDataCount = 1;
        chart.render();
        setTimeout(updateData, 100);
    }
    
    function updateData() {
        $.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart="+xValue+"&ystart="+yValue+"&length="+newDataCount+"type=json", addData);
    }
    
    }