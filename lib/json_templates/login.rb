module Login
  class Login
    attr_writer :username

    def initialize
      @username
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
        username: @username,
        message: "Login Successful"
      }

      return @success_template
    end

    def fail
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