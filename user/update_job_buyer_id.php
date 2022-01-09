<?php
    require 'api.php';
    $API = new API();

    $contentBodyJson = file_get_contents('php://input');
    $content = json_decode($contentBodyJson, true);
    $packageId = $API->getPackageID();

    $job_details = [
        'buyerID' => $content['userId']

    ];
   // error_log($freelancer_details);
    error_log($content['Id']);

   // $packageId, $tableName, $rowId, $data)
    $response = $API->editRowEntry($packageId, 'job_cache', $content['jobId'], $job_details);

    echo json_encode($response);

?>