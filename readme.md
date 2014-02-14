# Eye on Ukraine

This is a project for http://clovekvtisni.cz (people in need) that wants to stress the persecution of people on Ukraine.

The project is web application consisting of two parts:
* Public website - with information about all the cases of presecution
* App - the application available only for authenticated users for entering and editing cases


## Model
There is only one entity in the system *Case*.

*Case*

* Title - string
* Date - datetime
* NumberOfVictims - integer
* Description - string

## Hosting
Right now it is deployed on the appfog and it's available at http://eyeonukraine.eu01.aws.af.cm/