module Login
  class Login

    def initialize
      @errors = {
        full_messages: []
      }
    end

    def incorrect_username
      @errors[:username] = ['incorrect username']
      @errors[:full_messages].push 'incorrect username'

    end

    def incorrect_password
      @errors[:password] = ['incorrect password']
      @errors[:full_messages].push 'incorrect password'
    end

    def success
      @success_template = {
        status: {
          code: 200,
          message: "Success"
        },
        message: "Login Successful"
      }

      return @success_template
    end

    def fail
      puts @errors
      @fail_template = {
        status: {
          code: 401,
          message: "Unauthorized"
        },
        message: "Incorrect Credentials",
        errors: @errors
      }

      return @fail_template
    end

  end
end