<?php
    require 'api.php';
    $API = new API();

    $contentBodyJson = file_get_contents('php://input');
    $content = json_decode($contentBodyJson, true);
    $packageId = $API->getPackageID();

    $comment_details = [
        'admin_comment' => $content['comment']

    ];
    error_log($comment_details);
    error_log($content['Id']);

   // $packageId, $tableName, $rowId, $data)
    $response = $API->editRowEntry($packageId, 'freelancer_details', $content['Id'], $comment_details);

    echo json_encode($response);

?>