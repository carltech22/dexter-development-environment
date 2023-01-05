//Collect Joint Angle Measurements and XYZ Coordinates
function updateSelfXYZPoint(JobIdent){
  let xyzPoint = [JobIdent.robot.robot_status[Dexter.J1_MEASURED_ANGLE] ,
                  JobIdent.robot.robot_status[Dexter.J2_MEASURED_ANGLE] ,
                  JobIdent.robot.robot_status[Dexter.J3_MEASURED_ANGLE] ,
                  JobIdent.robot.robot_status[Dexter.J4_MEASURED_ANGLE] ,
                  JobIdent.robot.robot_status[Dexter.J5_MEASURED_ANGLE] ,
                  JobIdent.robot.robot_status[Dexter.J6_MEASURED_ANGLE],
                  JobIdent.robot.robot_status[Dexter.J7_MEASURED_ANGLE],
                  -(JobIdent.user_data.OldStartTime - JobIdent.robot.robot_status[Dexter.START_TIME]
                  + ((JobIdent.user_data.OldEndTime - JobIdent.robot.robot_status[Dexter.STOP_TIME]) / 1000000))]

  JobIdent.user_data.OldStartTime = JobIdent.robot.robot_status[Dexter.START_TIME]
  JobIdent.user_data.OldEndTime = JobIdent.robot.robot_status[Dexter.STOP_TIME]
  return xyzPoint
}

var PosVSTime = [];
new Job({
name: "Looping_Thru_Array_Values",
robot: Robot.dexter142,
do_list: [    
        Dexter.move_to([0.350,0,0.35]),
        Dexter.move_to_straight({xyz: [0.510, 0, 0.35], 
        J5_direction: [0, 0, -1], config: Dexter.RIGHT_UP_OUT,
        workspace_pose: null, 
        tool_speed: 5*_mm/_s,
        resolution: 5*_mm}),
        function (){PosVSTime = []},
        Robot.loop(200, function(){
        		let rt = []
             	rt.push(Dexter.get_robot_status())
             	rt.push(function (){
                let MeasAng = updateSelfXYZPoint(this)
                let TrimDta = MeasAng.slice(0, 5)
                TrimDta[5] = MeasAng[7]
                PosVSTime.push(TrimDta)
                out(MeasAng)
                write_file("Test1.csv", PosVSTime)
                })
                
                return rt
                }),
                //function(){out(PosVSTime.length)
                //	out(updateSelfXYZPoint(this).length)}, 
                	//Dexter.move_all_joints([0, 0, 0, 0, 0])   
                ]              
})
var J1 = [];
var J2 = [];
var J3 = [];
var J4 = [];
var J5 = [];
var time = [];
var x = [];
var y = [];
var z = [];
for(let i = 0; i < PosVSTime.length; i++){
	J1.push(PosVSTime[i][0])
    J2.push(PosVSTime[i][1])
    J3.push(PosVSTime[i][2])
    J4.push(PosVSTime[i][3])
    J5.push(PosVSTime[i][4])
    time.push(PosVSTime[i][5])
    x.push(Kin.J_angles_to_xyz([J1[i],J2[i],J3[i],J4[i],J5[i]])[0][0])
    y.push(Kin.J_angles_to_xyz([J1[i],J2[i],J3[i],J4[i],J5[i]])[0][1])
    z.push(Kin.J_angles_to_xyz([J1[i],J2[i],J3[i],J4[i],J5[i]])[0][2])
}
var trace1 = {type: "scatter", mode: "lines+markers",
y: J1, name: "J1"};
var trace2 = {type: "scatter", mode: "lines+markers",
y: J2, xaxis: "x2", yaxis: "y2", name: "J2",};
var trace3 = {type: "scatter", mode: "lines+markers",
y: J3, xaxis: "x3", yaxis: "y3", name: "J3",};
var trace4 = {type: "scatter", mode: "lines+markers",
y: J4, xaxis: "x4", yaxis: "y4", name: "J4",};
var trace5 = {type: "scatter", mode: "lines+markers",
y: J5, xaxis: "x5", yaxis: "y5", name: "J5",};
var trace6 = {type: "scatter", mode: "lines+markers",
y: x, xaxis: "x6", yaxis: "y6", name: "X",};
var trace7 = {type: "scatter", mode: "lines+markers",
y: y, xaxis: "x7", yaxis: "y7", name: "Y",};
var trace8 = {type: "scatter", mode: "lines+markers",
y: z, xaxis: "x8", yaxis: "y8", name: "Z",};

var data = [trace1,trace2,trace3,trace4,trace5,trace6,trace7,trace8];
var layout = {title: "Dexter Joint Angles", 
grid: {rows: 4, columns: 2, pattern: 'independent'},
width: 1000, height: 800,
xaxis: {title: "Data Points#", range:[0, J1.length],},
yaxis: {title: "J1 Degrees"},
xaxis2: {title: "Data Points#", range:[0, J1.length],},
yaxis2: {title: "J2 Degrees"},
xaxis3: {title: "Data Points#", range:[0, J1.length],},
yaxis3: {title: "J3 Degrees"},
xaxis4: {title: "Data Points#", range:[0, J1.length],},
yaxis4: {title: "J4 Degrees"},
xaxis5: {title: "Data Points#", range:[0, J1.length],},
yaxis5: {title: "J5 Degrees"},
xaxis6: {title: "Data Points#", range:[0, J1.length],},
yaxis6: {title: "X [m]"},
xaxis7: {title: "Data Points#", range:[0, J1.length],},
yaxis7: {title: "Y [m]"},
xaxis8: {title: "Data Points#", range:[0, J1.length],},
yaxis8: {title: "Z [m]"},}
var settings = {scrollZoom: true};
Plot.show(null, data, layout, settings)

new Job({
    name: "my_job",
    user_data_variable
    do_list: [
        Dexter.move_to([0.300, 0, 0.35], [0, 0, -1]),
        Dexter.J1_A2D_COS
        //Dexter.move_all_joints([0,0,0,0,0])
    ]
})
Job.my_job.robot.rs.measured_angles()
