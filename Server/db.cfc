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
      
      <cfset password = Hash(#password#, "SHA-512")> 

      <cfquery name="user" datasource="awsMicrosoftSQLServer">
          INSERT INTO hcUser (username, fName, lName, pswd, email, phone)
          VALUES (<cfqueryparam value='#username#'>,
                  <cfqueryparam value='#firstname#'>,
                  <cfqueryparam value='#lastname#'>,
                  <cfqueryparam value='#password#'>,
                  <cfqueryparam value='#email#'>,
                  <cfqueryparam value='#phone#'>)
      </cfquery>

      <cfreturn true>

   </cffunction>





   <!--- check if user in database (w previous functions), then "send email" (front or back work...?) --->
   <cffunction name="forgetPassword" returntype="boolean" access="remote">
      <!--- Getting with email...? --->

      <cfargument name="username" type="string" required="true">
      <cfset user = getUserInfo('#username#')>
      <cfif user.recordCount EQ 1>
         <!--- Update temporary password here? Then "send email" --->
         
         <cfreturn true>
      </cfif>

      <cfreturn false>

   </cffunction>


   <!--- createForgetPasswordPage() function???--->
   <cffunction name="createForgetPasswordPage" returntype="boolean" access="private">
   </cffunction>


   <!--- check if user in database (w previous functions), validate data, update user (only really password)--->
   <!--- Can change returntype to "void", left in in-case further validation checks are needed --->
   <cffunction name="updateUser" returntype="boolean" access="private">

       
       <cfargument name="username" type="string" required="true">
       <cfargument name="firstname" type="string">
       <cfargument name="lastname" type="string">
       <cfargument name="password" type="string">
       <cfargument name="email" type="string">
       <cfargument name="phone" type="string">
 
       <!-- Better validations goes here and cfreturn false for errors -->

       <cfset password = Hash(#password#, "SHA-512")>

       <!--- Should NOT change values if value is null... --->
       <cfquery name="user" datasource="awsMicrosoftSQLServer">
            UPDATE hcUser (username, fName, lName, pswd, email, phone)
            SET   fName = <cfqueryparam value='#firstname#'>,
                  lName = <cfqueryparam value='#lastname#'>,
                  pswd = <cfqueryparam value='#password#'>,
                  email = <cfqueryparam value='#email#'>,
                  phone = <cfqueryparam value='#phone#'>
            WHERE username = <cfqueryparam value='#username#'>
       </cfquery>

   </cffunction>


   <!---
   
      Client Based Functions
   
   --->


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