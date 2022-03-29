<?php
    require 'api.php';
    $API = new API();

    $contentBodyJson = file_get_contents('php://input');
    $content = json_decode($contentBodyJson, true);
    $packageId = $API->getPackageID();

    $cf_details = [
         "custom_fields" => $content['custom_fields'],
         "location_list"=> $content['location_list'],
         "document_list" =>  $content['document_list'],

         //job locations
        'is_remote_work' => $content['is_remote_work'],
        'is_in_person_work' => $content['is_inperson_work'],
        'in_person_work_address' => $content['in_person_work_address'],


        //job type
        'is_job_type_fulltime' => $content['is_job_type_fulltime'],
        'is_job_type_contract' =>  $content['is_job_type_contract'],
        
        //payment
        'is_payment_fixed' => $content['is_payment_fixed'],
        'is_payment_hourly' => $content['is_payment_hourly'],
        'payment_amount' => $content['payment_amount'],

        //task type list
        'task_type_list' => $content['task_type_list'],

        //time frame
        'time_frame_urgent' => $content['time_frame_urgent'], 
        'time_frame_nohurry' => $content['time_frame_nohurry'],
        'time_frame_date' => $content['time_frame_date'],
        'completion_date' => $content['completion_date'],   
        'job_validity' => $content['job_validity'],
        'comments' => $content['comments'],

        //contact info

        'buyer_name' => $content['buyer_name'],
        'buyer_email' => $content['buyer_email'],
        'buyer_contact' => $content['buyer_contact'],
        'will_provide_info' => "True",
        'status' => 'Available',
        'no_of_quotes' => 0
        
        // 'payment_hourly_value' => $content['payment_hourly_value'],
        // 'task_type_BAS_Agent' => $content['task_type_BAS_Agent'],
        // 'task_type_Tax' => $content['task_type_Tax'],
        // 'task_type_Audit' => $content['task_type_Audit'], 
        // 'task_type_bookkeeping' => $content['task_type_bookkeeping'],
        // 'task_type_Payroll' => $content['task_type_Payroll'], 
        // 'task_type_Finance' => $content['task_type_Finance'], 
        // 'time_frame_urgent' => $content['time_frame_urgent'], 
        // 'time_frame_nohurry' => $content['time_frame_nohurry'],
        // 'time_frame_timestamp' => $content['time_frame_timestamp'],
        // 'comments' => $content['comments'],
        // 'acknowledged_legal' => $content['acknowledged_legal'],
        // 'buyer_email' => $content['buyer_email'],
        // 'buyer_name' => $content['buyer_name'],
        // 'buyer_contact_no' => $content['buyer_contact_no'], 
        // 'provide_personal_details_to_merchant' => $content['provide_personal_details_to_merchant'],
        
        // 'status' => 'Available',
        // 'no_of_quotes' => 0
    ];

    $response = $API->createRowEntry($packageId, 'job_list', $cf_details);

    echo json_encode($response);

    //save in job location ct 

   $location_details = [
         
         "job_title" => "",
         "location_list"=> $content['location_list'],
         "job_id" =>  $response['Id']

        
    ];

    
   $response = $API->createRowEntry($packageId, 'job_locations', $location_details);

?>