<?php
        /*
                Basic mySQL connection to GetPaid Data base                
        */
        $server         = "engr-cpanel-mysql.engr.illinois.edu";
        $username         = "heng3_test";
        $user_password         = "password1";
        $database                = "heng3_testgetpaid";
        
        // Create connection to my Cpanel database
        $dbConnection = mysqli_connect($server, $username, $user_password, $database);
        if(mysqli_connect_errno($dbConnection)) {
                echo "Database connection error, please check internet connection";
                echo "Error: could not establish database connection" . mysqli_connect_error();
        }

        if(!mysqli_set_charset($dbConnection, "utf8")) {
                echo "Error loading characterset." . mysqli_error($dbConnection);
                exit(1);

        }
?>