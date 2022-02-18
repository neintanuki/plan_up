require './lib/json_templates/project_create.rb'
require './lib/json_templates/project_update.rb'
require './lib/json_templates/project_destroy.rb'
require './lib/json_templates/project_new.rb'

module Api
  module V1
    class TaskController < ApplicationController

      def create
        #find user
        #find project
        #find category
        #then create
        @body = JSON.parse(request.raw_post)
        # parse date
        @due_date = DateTime.new(
          @body["due_date"]["year"],
          @body["due_date"]["month"],
          @body["due_date"]["day"],
          @body["due_date"]["hour"],
          @body["due_date"]["minute"],          
        )

        @user = User.find(@id)
        @project = @user.projects.find(@body["project_id"])
        @category = @project.categories.find(@body["category_id"])
        @task = @category.tasks.create(
          name: @body["name"],
          body: @body["body"],
          is_completed: false,
          due_date: @due_date
        )

        if @task.save
          puts "saved"
          puts @task.id
        else
          puts "error"
        end

      end

      def new

      end

      def update

      end

      def destroy

      end

    end
  end
end