//A2D Data
var J1_SIN = [];
var J1_COS = [];
var J1_MEASURED_ANGLE = [];
var J1_DELTA = [];
function print_encoder_data(JobIdent){
	let data = [JobIdent.robot.robot_status[Dexter.J5_A2D_SIN],
				JobIdent.robot.robot_status[Dexter.J5_A2D_COS],
                JobIdent.robot.robot_status[Dexter.J5_MEASURED_ANGLE],
                JobIdent.robot.robot_status[Dexter.J5_DELTA]]
	return data
}

new Job({
    name: "my_job",
    inter_do_item_dur: 0.01,
    do_list: [
    	Dexter.move_all_joints([1.8,0,0,0,0]),
        function(){Saved_data = [];},
        Robot.loop(100, function(){
        		let rt = [];
             	rt.push(Dexter.get_robot_status())
             	rt.push(function (){
                let Measured_data = print_encoder_data(this)
                J1_SIN.push(Measured_data[0])
                J1_COS.push(Measured_data[1])
                J1_MEASURED_ANGLE.push(Measured_data[2])
                J1_DELTA.push(Measured_data[3])
                Saved_data.push(Measured_data)
                write_file("J1_Encoder_Data.csv", Saved_data)
                })
                return rt})
    ]
})
function plotJ1(){
var trace1 = {type: "scatter", mode: "lines+markers",
y: J1_SIN, name: "J1_SIN"};

var trace2 = {type: "scatter", mode: "lines+markers", 
y: J1_COS, name: "J1_COS"};

var data = [trace1,trace2];
var layout = {title: "Dexter J1 Encoder Data ", 
width: 900, height: 400,x: 100, y: 100};
var zoom = {scrollZoom: true}
Plot.show(null,data,layout,zoom)}

function plotJ1Ang(){
var trace1 = {type: "scatter", mode: "lines+markers",
y: J1_MEASURED_ANGLE, name: "J1_MEASURED_ANGLE"};

var trace2 = {type: "scatter", mode: "lines+markers", 
y: J1_DELTA, name: "J1_DELTA"};

var data = [trace1,trace2];
var layout = {title: "Dexter J1 Encoder Data ", 
width: 900, height: 400,x: 100, y: 100};
var zoom = {scrollZoom: true}
Plot.show(null,data,layout,zoom)}
new Job({
    name: "Plot_J1",
    do_list: [
       plotJ1,
    ]
})

new Job({
    name: "Plot_JAng",
    do_list: [
       plotJ1Ang,
    ]
})

