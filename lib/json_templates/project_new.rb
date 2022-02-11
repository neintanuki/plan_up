module ProjectCreate
  class ProjectCreate
    attr_writer :data

    def initialize
      @data
    end

    def success
      @success_template = {
        status: {
          code: 200,
          message: "Success"
        },
        data: @data
      }

      return @success_template
    end

  end
end