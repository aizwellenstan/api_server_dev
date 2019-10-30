/Account/login 
=> post  
for login

#OK
/Accout/info
=> get
for account info

#CRUD
/CompanyId/ProjectID/Module/
=> post
params: account / token / projectID / SeceneID / FunctionName / Json
Files:
ButtomBarSystem.json
ButtomBarDevice.json
ButtomBarSensor.json
ButtomBarAttribute.json

========>

C
/samplecompany/sampleproject/module/buttombar/system
=> post

R
/samplecompany/sampleproject/module/buttombar/system
=> get
File:

U
/samplecompany/sampleproject/module/buttombar/system/update
=> post

/samplecompany/sampleproject/module/buttombar/system/delete
=> post

/samplecompany/sampleproject/module/buttombar/device 
=> get
/samplecompany/sampleproject/module/buttombar/sensor 
=> get
/samplecompany/sampleproject/module/buttombar/atteibute
=> get