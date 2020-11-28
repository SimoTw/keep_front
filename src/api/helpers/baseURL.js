export const baseURL = (function () {
  switch (process.env.NODE_ENV) {
    case "development": {
      return "http://localhost:3000/api"
    }
    case "production": {
      return "http://keep-node-backend-dev.us-west-2.elasticbeanstalk.com/api"
    }
    default:
      throw new Error(`unhandleable NODE_ENV ${process.env.NODE_END}`)
  }
})()
