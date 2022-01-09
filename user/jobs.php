<?php
include 'callAPI.php';
include 'admin_token.php';


function getContent($customID) {
    $baseUrl = getMarketplaceBaseUrl();
    $admin_token = getAdminToken();
    $customFieldPrefix = getCustomFieldPrefix();
 
    //$url = $baseUrl . '/api/v2/plugins/'.$packageId.'/custom-tables/Templates/'.$pageID; 

    $templates = array(array('Name' => 'Id', "Operator" => "in",'Value' => $customID));
    $url =  $baseUrl . '/api/v2/plugins/'. getPackageID() .'/custom-tables/job_cache';
    $templateDetails =  callAPI("POST", $admin_token['access_token'], $url, $templates);
    
    return $templateDetails;
}

function getFiles($customID) {
    $baseUrl = getMarketplaceBaseUrl();
    $admin_token = getAdminToken();
    $customFieldPrefix = getCustomFieldPrefix();
 
    //$url = $baseUrl . '/api/v2/plugins/'.$packageId.'/custom-tables/Templates/'.$pageID; 

    $file = array(array('Name' => 'jobID', "Operator" => "in",'Value' => $customID));
    $url =  $baseUrl . '/api/v2/plugins/'. getPackageID() .'/custom-tables/job_custom_task_cache';
    $fileDetails =  callAPI("POST", $admin_token['access_token'], $url, $file);
    
    return $fileDetails;
}


function getFreelancerDetails($userId) {
    
    $baseUrl = getMarketplaceBaseUrl();
    $admin_token = getAdminToken();
    $customFieldPrefix = getCustomFieldPrefix();
 
    //$url = $baseUrl . '/api/v2/plugins/'.$packageId.'/custom-tables/Templates/'.$pageID; 

    $user = array(array('Name' => 'user_id', "Operator" => "in",'Value' => $userId));
    $url =  $baseUrl . '/api/v2/plugins/'. getPackageID() .'/custom-tables/freelancer_details';
    $userDetails =  callAPI("POST", $admin_token['access_token'], $url, $user);
    
    return $userDetails;
}

// function getPreview($page){
//     $baseUrl = getMarketplaceBaseUrl();
//     $admin_token = getAdminToken();
//     $customFieldPrefix = getCustomFieldPrefix();
//     $url = $baseUrl . '/api/v2/marketplaces/'; 
//     $marketplaceInfo = callAPI("GET", $admin_token['access_token'], $url, false);
  
//     foreach ($marketplaceInfo['CustomFields'] as $cf) {
//         if ($cf['Name'] == $page && substr($cf['Code'], 0, strlen($customFieldPrefix)) == $customFieldPrefix) {
//             $pageContent = $cf['Values'][0];
//         }
//         if ($pageContent == ''){
//             $pageContent =  'No preview Available';
//         }
//     }
//     return $pageContent;
// }

?>

