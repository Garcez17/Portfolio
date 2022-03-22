import formidable from 'formidable';

const form = formidable({ multiples: true });

export async function parseMultipartForm(req: any, res: any, next: any) {
  const contentType = req.headers['content-type']
  if (contentType && contentType.indexOf('multipart/form-data') !== -1) {
    form.parse(req, (err, fields, files) => {
      if (!err) {
        req.body = fields;
        req.files = files;
      }
      next();
    })
  } else {
    next();
  }
}