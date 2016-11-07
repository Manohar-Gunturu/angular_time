# angular_time

declare rstime as dependency as shown below.

```javascript
angular.module('myModule', ['rstime']);
```

## Example Markup as 


    <rs-time is-live="true" digital-format="'ddd MMM d h:mm:ss TT'"></rs-time>
    
    
This whil give a live time starting from current time.


## Unix timestamp live

You can convert Unix time stamp to local time as shown below

       <rs-time start-time="1478513323" digital-format="'ddd MMM d h:mm TT'"></rs-time>

## To show difference between start-time and current time

       <rs-time  diff="true" start-time="1478513323" digital-format="'ddd MMM d h:mm TT'"></rs-time>

Make it live by adding is-live attribute

        <rs-time is-live="true" diff="true" start-time="1478512492" digital-format="'ddd MMM d h:mm TT'"></rs-time>


Below are different formates of time:

         M/d/y -  11/7/2016
         
         HH:mm:ss - 16:02:31 (24hrs formate)
         
         hh:mm:ss TT - 04:03:10 PM
         
         ddd MMM d h:mm TT  - Mon Nov 7 at 4:04 PM
         

Check it out at https://plnkr.co/edit/Xz5aFo8s34r6XjL08mIU?p=preview.

###License

angular_time.js is available under the MIT license.
