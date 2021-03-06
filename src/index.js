const fs = require('fs')
const { render } = require('mustache')

const quantor = data => callback => {

  if (!data.endpoints) {
    throw new Error('Missing endpoints')
  }

  const formatted = {
    title: data.title,
    description: data.description,
    base: data.base,
    endpoints: data.endpoints.map(endpoint => ({
      name: endpoint.name,
      display: endpoint.display,
      description: endpoint.description,
      handlers: Object.keys(endpoint.handlers)
        .map(key => ({
          key: key.toLowerCase(),
          handler: endpoint.handlers[key],
        }))
        .map(({ key, handler }) => ({
          get: key === 'get',
          post: key === 'post',
          put: key === 'put',
          delete: key === 'delete',
          head: key === 'head',
          options: key === 'options',
          patch: key === 'patch',

          queryParams: !!handler.requiredQueryParams || !!handler.optionalQueryParams,
          bodyParams: !!handler.requiredBodyParams || !!handler.optionalBodyParams,
          headers: !!handler.requiredHeaders || !!handler.optionalHeaders,

          requiredQueryParams: handler.requiredQueryParams && handler.requiredQueryParams.map(format),
          requiredBodyParams: handler.requiredBodyParams && handler.requiredBodyParams.map(format),
          optionalQueryParams: handler.optionalQueryParams && handler.optionalQueryParams.map(format),
          optionalBodyParams: handler.optionalBodyParams && handler.optionalBodyParams.map(format),
          requiredHeaders: handler.requiredHeaders && handler.requiredHeaders.map(format),
          optionalHeaders: handler.optionalHeaders && handler.optionalHeaders.map(format),

          hasResponses: !!handler.responses,
          responses: handler.responses && handler.responses.map(({ code, model }) => ({ code, model: data.models ? (JSON.stringify(data.models[model], null, 2) || model) : model }))
        })),
    })),
  }

  fs.readFile(__dirname + '/index.mustache', (err, template) => {
    if (err) throw err
    const html = render(template.toString(), formatted)
    callback(html)
  })
}

const format = param => ({ 
  name: param.name, 
  type: param.type,
  default: param.default,
  info: param.description
})

module.exports = quantor
