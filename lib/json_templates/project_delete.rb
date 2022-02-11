module ProjectDelete
  class ProjectDelete
    def success
      @success_template = {
        status: {
          code: 200,
          message: "Success"
        },
        message: "Project Deleted"
      }

      return @success_template
    end
  end
end