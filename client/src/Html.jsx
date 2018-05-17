/**
 * Html
 * This Html.js file acts as a template that we insert all our generated
 * application strings into before sending it to the client.
 */
const Html = ({ body, styles, title }) => `
<!DOCTYPE html>
<html>
<head>
  <title>fec gallery</title>
  <!-- Import Google Icon Font -->
  <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link rel="icon" href="https://s3-us-west-1.amazonaws.com/apateezassets/apateez-logo-small-red.jpeg" type="image/x-icon">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.10/css/all.css" integrity="sha384-+d0P83n9kaQMCwj8F4RJB66tzIwOKmrdb46+porD/OvrJ+37WqIM7UoBtwHO6Nlg" crossorigin="anonymous">
  <!-- Import materialize.css -->
  <link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/css/materialize.min.css" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
  <div id="app"></div>
  <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/js/materialize.min.js"></script>
  <script type="text/javascript" src="bundle.js"></script>
  <!-- <script type="text/javascript" src="http://54.153.55.71:3002/restaurants/bundle.js"></script> -->
</body>
</html>
`;

export default Html;

// <!DOCTYPE html>
// <html>
// <head>
//   <title>fec gallery</title>
//   <!-- Import Google Icon Font -->
//   <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
//   <link rel="icon" href="https://s3-us-west-1.amazonaws.com/apateezassets/apateez-logo-small-red.jpeg" type="image/x-icon">
//   <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.10/css/all.css" integrity="sha384-+d0P83n9kaQMCwj8F4RJB66tzIwOKmrdb46+porD/OvrJ+37WqIM7UoBtwHO6Nlg" crossorigin="anonymous">
//   <!-- Import materialize.css -->
//   <link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/css/materialize.min.css" rel="stylesheet">
//   <link rel="stylesheet" type="text/css" href="style.css">
// </head>
// <body>
//   <div id="app"></div>
//   <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
//   <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/js/materialize.min.js"></script>
//   <script type="text/javascript" src="bundle.js"></script>
//   <!-- <script type="text/javascript" src="http://54.153.55.71:3002/restaurants/bundle.js"></script> -->
// </body>
// </html>
