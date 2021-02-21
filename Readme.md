Theme : Travelling

API's USED : 
https://indianrailapi.com/api/v2/AllTrainOnStation

https://indianrailapi.com/api/v2/TrainSchedule

*PROBLEM STATEMENT*

Whenever we are in a rush to visit any place, often the primary approach to most of the Indian community would be railways. Railways provide decent services at reduced costs which is more preferable compared to any other means of transport. But, what if the buffer time between booking tickets and the actual date of train travel is less than a week? That's where the problem starts, in such situations, you cannot find a suitable direct point-to-point train that picks you from your city and drops you at the desired location. Such trains usually have their tickets sold out if you check a week before the scheduled travel day.

*SOLUTION*

When you don't find a suitable direct train from your source to your destination, you pick a station in between and try to find trains till that point and from there to your final destination. We designed an algorithm that helps you pick a station in between the source and destination. Considering that station we find trains that go till the station and from the station to your final destination.


*Working*

The algorithm takes two inputs from the user i.e the station code of his/her source and destination. From these inputs, we find that long train's route whose tickets would be most probably sold out. We monitor the stop time of this train at each platform and then determine a station to be vast if it has a larger stop time. Optimizing furthermore, we select only such stations that fall under  40%-70% of the total distance so that a station nearer to the source or destination is not selected. From here on we get to find the trains that let us reach the middle station selected with the algorithm and give us suitable options to get there easily, saving time.
