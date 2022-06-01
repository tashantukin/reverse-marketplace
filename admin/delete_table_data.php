 <?php
include 'callAPI.php';
include 'admin_token.php';
$contentBodyJson = file_get_contents('php://input');
$content = json_decode($contentBodyJson, true);
$table_name = $content['table-name'];


$baseUrl = getMarketplaceBaseUrl();
$admin_token = getAdminToken();
$customFieldPrefix = getCustomFieldPrefix();
//   'Operator' => 'equal',

  $url = $baseUrl . '/api/v2/plugins/'. getPackageID() .'/custom-tables/' . $table_name . '?pageSize=1000';
  $couponDetails = callAPI("GET", null, $url, false);
   echo json_encode(['result' => $couponDetails]);

  foreach($couponDetails['Records'] as $record) {
    $url = $baseUrl . '/api/v2/plugins/'. getPackageID() .'/custom-tables/' . $table_name .'/rows/'. $record['Id'];
    echo json_encode(['url' => $url]);

    
    $result = callAPI("DELETE", null, $url);
  }

  echo json_encode(['result' => $result]);

  ?>