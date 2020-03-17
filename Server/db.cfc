<cfcomponent displayname="User">

   <!---
      
      User Based Functions
   
   --->

   <!--- Return user info with a given username --->
   <cffunction name="getUserInfo" returntype="query" access="private">
      
      <cfargument name="username" type="string" required="true">

      <cfquery name="user" datasource="awsMicrosoftSQLServer">
         SELECT *
         FROM hcUser
         WHERE username = <cfqueryparam value='#username#'>
      </cfquery>

      <cfreturn user>

   </cffunction>


   <!--- Check if username and password combination match --->
   <cffunction name="checkUser" returntype="string" access="remote">

      <cfargument name="username" type="string" required="true">
      <cfargument name="password" type="string" required="true">
      <cfset password = Hash('#password#', "SHA-512")>
      <cfset user = getUserInfo('#username#')>
      <cfreturn user.recordCount EQ 1 AND '#password#' EQ user.pswd>

   </cffunction>



   <!--- Validate arguments and query a new user into hcUser --->
   <cffunction name="registerUser" returntype="boolean" access="remote">
      
      
      <cfargument name="username" type="string" required="true">
      <cfargument name="firstname" type="string" required="true">
      <cfargument name="lastname" type="string" required="true">
      <cfargument name="password" type="string" required="true">
      <cfargument name="email" type="string" required="true">
      <cfargument name="phone" type="string" required="true">
      <cfargument name="squestion" type="string" required="true">
      <cfargument name="sanswer" type="string" required="true">


      <cfset password = Hash('#password#', "SHA-512")> 
      <cfset squestion = val('#squestion#')>

      <cfquery name="user" datasource="awsMicrosoftSQLServer">
          INSERT INTO hcUser (username, fName, lName, pswd, email, phone, sQuestion, sAnswer)
          VALUES (<cfqueryparam value='#username#'>,
                  <cfqueryparam value='#firstname#'>,
                  <cfqueryparam value='#lastname#'>,
                  <cfqueryparam value='#password#'>,
                  <cfqueryparam value='#email#'>,
                  <cfqueryparam value='#phone#'>,
                  <cfqueryparam value='#squestion#'>,
                  <cfqueryparam value='#sanswer#'>)
      </cfquery>

      <cfreturn true>

   </cffunction>



   <!--- Check if user in database and send corresponding security question --->
   <cffunction name="forgetPassword" returntype="numeric" access="remote">

      <cfargument name="username" type="string" required="true">

      <cfset user = getUserInfo('#username#')>
      <cfif user.recordCount EQ 1>
         <cfreturn val('#user.sQuestion#')>
      </cfif>

      <cfreturn -1>
   </cffunction>

   <!--- Check if user answer matches corresponding database record --->
   <cffunction name="checkSecurityAnswer" returntype="boolean" access="remote">

      <cfargument name="username" type="string" required="true">
      <cfargument name="answer" type="string" required="true">

      <cfset user = getUserInfo('#username#')>

      <cfreturn user.sAnswer EQ '#answer#'>
   </cffunction>
   

   <!--- Update a user's password in database --->
   <cffunction name="updateUserPassword" returntype="void" access="remote">
      <cfargument name="username" type="string" required="true">
      <cfargument name="password" type="string" required="true">

      <cfset password = Hash('#password#', "SHA-512")>

      <cfquery name="user" datasource="awsMicrosoftSQLServer">
            UPDATE hcUser
            SET   pswd = <cfqueryparam value='#password#'>
            WHERE username = <cfqueryparam value='#username#'>
      </cfquery>
   </cffunction>

   <!---
   
      Client Based Functions
   
   --->


   <!--- Return clientinfo with a given client ID --->
   <cffunction name="getClientInfo" returntype="query" access="private">
      <cfargument name="clientID" type="string" required="true">
      <!--- Query for client and return query --->
      <cfquery name="clientInfo" datasource="awsMicrosoftSQLServer">
         SELECT *
         FROM wfClient
         WHERE id = <cfqueryparam value='#clientID#'>
      </cfquery>
      <cfreturn clientInfo>
   </cffunction>

   <!--- Public return of clientinfo --->
   <cffunction name="clientProfile" returntype="query" access="remote">
      <cfargument name="clientID" type="string" required="true">
      <cfset clientInfo=getClientInfo('#clientID#')>
      <cfreturn clientInfo>
   </cffunction>


   <!--- Return clientworksheets with a given client ID --->
   <cffunction name="getClientWorksheets" returntype="query" access="private">
      <!--- Query for client and return query --->
      <cfargument name="clientID" type="string" required="true">
      <cfquery name="clientWorksheets" datasource="awsMicrosoftSQLServer">
         SELECT dateSubmitted, rentSubsidyPayment
         FROM worksheet
         WHERE clientID = <cfqueryparam value='#clientID#'>
      </cfquery>
      <cfreturn clientWorksheets>
   </cffunction>

   <!--- Public return of clientworksheets --->
   <cffunction name="clientWorksheetProfile" returntype="query" access="remote">
      <cfargument name="clientID" type="string" required="true">
      <cfset worksheets=getClientWorksheets('#clientID#')>
      <cfreturn worksheets>
   </cffunction>


   <!--- function that return clients whose name(s) match the input given --->
   <cffunction name = "clientSearchRegex" returntype = "query" access = "private">
      <cfargument name="clientName" type="string" required="true">
      <cfset splitCName = listToArray(clientName, " ")>
      <cfset splitCName[1] = splitCName[1]&'%'>
      <cfif arrayLen(splitCName) GT 1>
         <cfset splitCName[2] = splitCName[2]&'%'>
      </cfif>


      <!--- if first and last name have been entered --->
      <cfif ArrayLen(splitCName) GT 1> 
         <cfquery name = "clientSearchSQL2" datasource="awsMicrosoftSQLServer">
               SELECT fName, lName, dob, id
               FROM wfClient
               WHERE fName LIKE  <cfqueryparam value='#splitCName[1]#'> AND lName LIKE <cfqueryparam value='#splitCName[2]#'>
         </cfquery>
         <cfreturn clientSearchSQL2>

      <!--- if only one name has been entered --->
      <cfelse>
         <cfquery name = "clientSearchSQL1" datasource="awsMicrosoftSQLServer">
               SELECT fName, lName, dob, id
               FROM wfClient
               WHERE fName LIKE <cfqueryparam value='#splitCName[1]#'> OR lName LIKE <cfqueryparam value='#splitCName[1]#'>
         </cfquery>
         <cfreturn clientSearchSQL1>
      </cfif> 
   </cffunction>

   <!--- function that return clients whose name(s) matches the input given --->
   <cffunction name = "getCSearchRegex" access = "remote">
      <cfargument name="clientName" type="string" required="true">
      <cfset clients= clientSearchRegex('#clientName#')>
      <cfreturn clients>
   </cffunction>


   <!---Insert Client into database--->
   <cffunction name= "addClient" returntype="boolean" access="remote">
      <cfargument name="fName" type="string" required="true">
      <cfargument name="lName" type="string" required="true">
      <cfargument name="addStreet" type="string" required="false">
      <cfargument name="addCity" type="string" required="false">
      <cfargument name="addState" type="string" required="false">
      <cfargument name="addZip" type="string" required="false">
      <cfargument name="gender" type="string" required="true">
      <cfargument name="dob" type="date" required="true">


      <cfif isNull(#addStreet#)>
         <!--- when no address has been entered --->
         <cfquery name="addC1" datasource="awsMicrosoftSQLServer">
            INSERT INTO wfClient (fName, lName, gender, dob)
            VALUES (<cfqueryparam value='#fName#'>,
                    <cfqueryparam value='#lName#'>, 
                    <cfqueryparam value='#gender#'>, 
                    <cfqueryparam value='#dob#'>)
         </cfquery>
      <cfelse>
         <!--- when wfClient has an address --->
         <cfquery name="addC2" datasource="awsMicrosoftSQLServer">
            INSERT INTO wfClient (fName, lName, addStreet, addCity, addState, addZip, gender, dob)
            VALUES (<cfqueryparam value='#fName#'>,
                    <cfqueryparam value='#lName#'>, 
                    <cfqueryparam value='#addStreet#'>, 
                    <cfqueryparam value='#addCity#'>, 
                    <cfqueryparam value='#addZip#'>, 
                    <cfqueryparam value='#gender#'>, 
                    <cfqueryparam value='#dob#'>)
         </cfquery>
      </cfif>

      <cfreturn true>
   </cffunction>

   <!--- Unit test for simple non SQL INSERT functions --->
   <cffunction name="nonInsertTest" returntype="void" access="remote">

      <cfset testUserName = "sharkeisha">
      <cfset testUserPass = "testPass">
      <cfset testUserSQuestion = 0>
      <cfset invalidSQuestion = -1>

      <cfset checkUserTest = checkUser('#testUserName#', '#testUserPass#')>
      <cfoutput>getUserInfo()_checkUser()_test1: #checkUserTest#</cfoutput>

      <cfset forgetPasswordTest = forgetPassword('#testUserName#') EQ #testUserSQuestion#>
      <cfoutput>forgetPassword()_test1: #forgetPasswordTest#</cfoutput>
      <cfset forgetPasswordTest = forgetPassword('INVALIDUSER') EQ #invalidSQuestion#>
      <cfoutput>forgetPassword()_test1: #forgetPasswordTest#</cfoutput>

      <cfset checkSecurityAnswerTest = checkSecurityAnswer('#testUserName#', 'emptyAnswer')>
      <cfoutput>checkSecurityAnswer()_test1: #checkSecurityAnswerTest#</cfoutput>
      <cfset checkSecurityAnswerTest = checkSecurityAnswer('#testUserName#', '') EQ false>
      <cfoutput>checkSecurityAnswer()_test2: #checkSecurityAnswerTest#</cfoutput>

      <cfset testClientID = 1>
      <cfset testClientProfileFName = "tom">
      <cfset testClientWorksheetProfileDateSubmitted = "2013-03-04">
      <cfset testClientSearch1 = "t">
      <cfset testClientSearch2 = "h">
      <cfset testClientSearch3 = "tom h">

      <cfset clientProfileTest = clientProfile('#testClientID#').fName EQ '#testClientProfileFName#'>
      <cfoutput>getClientInfo()_clientProfile()_test1: #clientProfileTest#</cfoutput>

      <!--- Technically should test for multiple worksheets --->
      <cfset clientWorksheetProfileTest = clientWorksheetProfile('#testClientID#').dateSubmitted EQ '#testClientWorksheetProfileDateSubmitted#'>
      <cfoutput>getClientWorksheets()_clientWorksheetProfile()_test1: #clientWorksheetProfileTest#</cfoutput>

      <cfset getCSearchRegexTest = getCSearchRegex('#testClientSearch1#').id EQ #testClientID#>
      <cfoutput>getCSearchRegex()_clientSearchRegex()_test1: #clientProfileTest#</cfoutput>
      <cfset getCSearchRegexTest = getCSearchRegex('#testClientSearch2#').id EQ #testClientID#>
      <cfoutput>getCSearchRegex()_clientSearchRegex()_test2: #clientProfileTest#</cfoutput>
      <cfset getCSearchRegexTest = getCSearchRegex('#testClientSearch3#').id EQ #testClientID#>
      <cfoutput>getCSearchRegex()_clientSearchRegex()_test3: #clientProfileTest#</cfoutput>

   </cffunction>

</cfcomponent>
