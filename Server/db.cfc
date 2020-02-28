<cfcomponent displayname="User">
 
   <!--- Bypass CORS Policy --->
   <cfheader name="Access-Control-Allow-Origin" value="*">
   <cfheader name="Access-Control-Allow-Methods" value="GET,PUT,POST,DELETE">
   <cfheader name="Access-Control-Allow-Headers" value="Content-Type">


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
   <cffunction name="checkUser" returntype="boolean" access="remote">

      <cfargument name="username" type="string" required="true">
      <cfargument name="password" type="string" required="true">
      <cfset password = Hash(#password#, "SHA-512")>
      <cfset user = getUserInfo('#username#')>
      <cfreturn user.recordCount EQ 1 AND '#password#' EQ user.pswd>

   </cffunction>



   <!--- Validate arguments and query a new user into hcUser --->
   <!--- Can change returntype to "void", left in in-case further validation checks are needed --->
   <cffunction name="registerUser" returntype="boolean" access="remote">
      
      
      <cfargument name="username" type="string" required="true">
      <cfargument name="firstname" type="string" required="true">
      <cfargument name="lastname" type="string" required="true">
      <cfargument name="password" type="string" required="true">
      <cfargument name="email" type="string" required="true">
      <cfargument name="phone" type="string" required="true">
      <cfargument name="squestion" type="int" required="true">
      <cfargument name="sanswer" type="string" required="true">


      <cfset password = Hash(#password#, "SHA-512")> 

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
   <cffunction name="forgetPassword" returntype="int" access="remote">

      <cfargument name="username" type="string" required="true">

      <cfset user = getUserInfo('#username#')>
      <cfif user.recordCount EQ 1>
         <cfreturn user.sQuestion>
      </cfif>

      <cfreturn -1>
   </cffunction>

   <!--- Check if user answer matches corresponding database record --->
   <cffunction name="checkSecurityAnswer" returntype="bool" access="remote">

      <cfargument name="username" type="string" required="true">
      <cfargument name="answer" type="string" required="true">

      <cfset user = getUserInfo('#username#')>

      <cfreturn user.sQuestion EQ '#answer#'>

   </cffunction>


   <!--- Update a user's password in database --->
   <cffunction name="updateUserPassword" returntype="boolean" access="remote">
      <cfargument name="username" type="string" required="true">
      <cfargument name="password" type="string" required="true">

      <cfset password = Hash(#password#, "SHA-512")>

      <cfquery name="user" datasource="awsMicrosoftSQLServer">
            UPDATE hcUser (username, fName, lName, pswd, email, phone)
            SET   pswd = <cfqueryparam value='#password#'>
            WHERE username = <cfqueryparam value='#username#'>
      </cfquery>
   </cffunction>

   <!---
   
      Client Based Functions
   
   --->

   <!--- (Future: Client Profile Work) --->

   <!--- Return clientinfo with a given... (id?) --->
   <cffunction name="getClientInfo" access="private">
      <!--- Query for client and return query --->
   </cffunction>

   <!--- Public return of clientinfo --->
   <cffunction name="clientProfile" access="remote">
      <cfset wfClient=getClientInfo()>
      <cfreturn wfClient>
   </cffunction>


   <!--- Return clientworksheets with a given client (id?) --->
   <cffunction name="getClientWorksheets" access="private">
      <!--- Query for client and return query --->
   </cffunction>

   <!--- Public return of clientworksheets --->
   <cffunction name="clientWorksheetProfile" access="remote">
      <cfset worksheets=getClientWorksheets()>
      <cfreturn worksheets>
   </cffunction>



   <!--- (Future: Search Page Work) --->

   <!--- Perhaps, only return client firstName, lastName, dob, and an identifier (id?) --->
   <!--- Return all clients --->
   <cffunction name="getClients" returntype="array" access="private">
      <cfquery name="clients" datasource="awsMicrosoftSQLServer">
        SELECT *
        FROM wfClient
      </cfquery>
      <cfreturn clients>
   </cffunction>

   <!--- Public return of all clients --->
   <cffunction name="getSearchClients" access="remote">
      <cfset clients=getClients()>
      <cfreturn clients>
   </cffunction>


</cfcomponent>