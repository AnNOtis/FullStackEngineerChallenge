module Errors
  class APIError < StandardError
    attr_reader :status

    def initialize(msg="Something went wrong", status=:internal_server_error)
      @status = status
      super(msg)
    end

    def as_json options
      {
        error: {
          status: status,
          message: message
        }
      }
    end
  end

  class UnauthorizedError < APIError
    def initialize(msg="Unauthorized Error")
      super(msg, :unauthorized)
    end
  end
end
