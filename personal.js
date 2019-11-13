var router = require('express').Router();

router.get('/:idPersonal', function (req, res) {
  const idPersonal = req.params.idPersonal;
  if (['perla', 'david', 'samantha'].indexOf(idPersonal) > -1) {
      if (idPersonal === 'perla') {
          res.status(200).send({
              'message': 'Success Personal',
              'data': {
                      "title": "Perla Santillán",
                      "description": "<p>Licenciada en Derecho egresada de la Facultad de Estudios Superiores Acatlán de la Universidad Nacional Autónoma de México. Especialista en Derecho Fiscal por la misma Universidad.</p><p>Cuenta con estudios de Diplomado en Derecho Procesal Fiscal por la citada Institución; experta en el área Contenciosa – Administrativa y Amparo.</p><p>Desde 2014, se ha desempeñado en el sector privado.</p>"
              }
          });
      } else if (idPersonal === 'david') {
          res.status(200).send({
              'message': 'Success Personal',
              'data': {
                  "title": "David Sierra",
                  "description": "<p>Licenciado en Derecho con Especialidad en Derecho Fiscal por la Universidad Nacional Autónoma de México.</p><p>Cuenta con estudios en Diplomados y Cursos sobre Derecho Fiscal, Defensa Fiscal y Asesoría Contable.</p><p>Docente de diversas universidades privadas del Estado de México y la Ciudad de México, así como de la Universidad Autónoma de la Ciudad de México.</p><p>Desde el año 2008 se desempeñó en el sector público, específicamente en el Servicio de Administración Tributaría en el área de Recaudación y como asesor fiscal, posteriormente, a partir del año 2012 se ha desempeñado en el sector privado.</p><p>Cuenta con más de diez años de experiencia en el litigio, siendo al día de hoy un experto en la materia.</p>"
              }
          });
      } else if (idPersonal === 'samantha') {
          res.status(200).send({
              'message': 'Success Personal',
              'data': {
                  "title": "Samantha Escobar",
                  "description": "<p>Licenciada en Contaduría Pública, egresada de la Universidad Autónoma de Guadalajara, Licenciada en Derecho, por la misma Universidad. Especialista en Derecho Fiscal.</p><p>Desde 2003 se desempeñó en el servicio público, en el Servicio de Administración Tributaria, como Asesor Fiscal, Agente Resolutor de Problemas, Jefe de Departamento y Abogado Dictaminador, así como en la Procuraduría de Defensa del Contribuyente, en el puesto de Jefe de Departamento, en el área de Quejas y Resoluciones.</p><p>Posteriormente a partir del año 2015, comenzó a laborar en el sector privado.</p>"
              }
          });

      }
  }

  res.status(404).send({ 'message': 'No se ha encontrado al personal.' });
});

module.exports = router;