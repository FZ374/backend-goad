const API_URL = '/api';

// Navigation
function showSection(sectionId, btn) {
    // Esconder todas las secciones
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    // Quitar active-tab de todos los botones
    document.querySelectorAll('#main-nav button').forEach(b => b.classList.remove('active-tab'));
    
    // Mostrar sección actual y activar botón
    document.getElementById(sectionId).classList.add('active');
    if (btn) btn.classList.add('active-tab');

    if (sectionId === 'anuncios') loadAnuncios();
    if (sectionId === 'vehiculos') loadVehiculos();
}

// =======================
// AUTH / USUARIOS CRUD
// =======================
document.getElementById('form-usuario').addEventListener('submit', async (e) => {
    e.preventDefault();
    const body = {
        dni: document.getElementById('u-dni').value,
        nombres: document.getElementById('u-nombres').value,
        apellido_paterno: document.getElementById('u-ape-pat').value,
        apellido_materno: document.getElementById('u-ape-mat').value || null,
        celular: document.getElementById('u-celular').value || null,
        email: document.getElementById('u-email').value,
        passw: document.getElementById('u-passw').value,
        rol: document.getElementById('u-rol').value
    };

    try {
        const res = await fetch(`${API_URL}/usuarios`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (res.ok) {
            alert('Usuario registrado con éxito');
            e.target.reset();
        } else {
            const err = await res.json();
            alert('Error al registrar: ' + JSON.stringify(err));
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

document.getElementById('form-login').addEventListener('submit', async (e) => {
    e.preventDefault();
    const body = {
        email: document.getElementById('l-email').value,
        passw: document.getElementById('l-passw').value
    };

    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        const data = await res.json();
        
        if (res.ok) {
            document.getElementById('login-result').innerText = `✅ Login Exitoso! Hola ${data.user.nombres}`;
            // Optional: guardamos token en localstorage para pruebas
            localStorage.setItem('token', data.token);
            e.target.reset();
        } else {
            document.getElementById('login-result').innerText = '';
            alert('Error al hacer login: ' + (data.msg || JSON.stringify(data)));
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

// =======================
// ANUNCIOS CRUD
// =======================
async function loadAnuncios() {
    try {
        const res = await fetch(`${API_URL}/anuncios`);
        const data = await res.json();
        
        const container = document.getElementById('list-anuncios');
        container.innerHTML = '';

        if (!data || data.length === 0) {
            container.innerHTML = '<p>No hay anuncios creados.</p>';
            return;
        }

        data.forEach(item => {
            const div = document.createElement('div');
            div.className = 'item';
            div.innerHTML = `
                <div class="item-info">
                    <strong>ID: ${item.id_anuncio} | ${item.titulo}</strong>
                    <p>${item.descripcion}</p>
                    <small>Categoría: ${item.categoria || item.id_categoria} | Vistas: ${item.vistas}</small>
                </div>
                <button class="delete-btn" onclick="deleteAnuncio(${item.id_anuncio})">Eliminar</button>
            `;
            container.appendChild(div);
        });
    } catch (error) {
        console.error('Error cargando anuncios:', error);
    }
}

document.getElementById('form-anuncio').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const body = {
        titulo: document.getElementById('a-titulo').value,
        descripcion: document.getElementById('a-descripcion').value,
        latitud: document.getElementById('a-latitud').value || null,
        longitud: document.getElementById('a-longitud').value || null,
        numero_telefono: document.getElementById('a-telefono').value,
        id_usuario: document.getElementById('a-usuario').value,
        id_categoria: document.getElementById('a-categoria').value
    };

    try {
        const res = await fetch(`${API_URL}/anuncios`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (res.ok) {
            alert('Anuncio creado con éxito');
            e.target.reset();
            loadAnuncios();
        } else {
            const err = await res.json();
            alert('Error al crear: ' + JSON.stringify(err));
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

async function deleteAnuncio(id) {
    if (!confirm('¿Seguro que quieres eliminar este anuncio lógico?')) return;
    try {
        await fetch(`${API_URL}/anuncios/${id}`, { method: 'DELETE' });
        loadAnuncios();
    } catch (error) {
        alert('Error al eliminar');
    }
}

// =======================
// VEHÍCULOS CRUD
// =======================
async function loadVehiculos() {
    try {
        const res = await fetch(`${API_URL}/vehiculos`);
        const data = await res.json();
        
        const container = document.getElementById('list-vehiculos');
        container.innerHTML = '';

        if (!data || data.length === 0) {
            container.innerHTML = '<p>No hay vehículos creados.</p>';
            return;
        }

        data.forEach(item => {
            const div = document.createElement('div');
            div.className = 'item';
            div.innerHTML = `
                <div class="item-info">
                    <strong>ID Anuncio: ${item.id_anuncio} | ${item.titulo}</strong>
                    <p>Marca: ${item.marca || 'N/A'} | Modelo: ${item.modelo || 'N/A'} | Año: ${item.anio || 'N/A'}</p>
                    <p>Precio: $${item.precio || 0} | Kilometraje: ${item.kilometraje || 0} km</p>
                    <small>Descripción: ${item.descripcion}</small>
                </div>
                <button class="delete-btn" onclick="deleteVehiculo(${item.id_anuncio})">Eliminar</button>
            `;
            container.appendChild(div);
        });
    } catch (error) {
        console.error('Error cargando vehículos:', error);
    }
}

document.getElementById('form-vehiculo').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const body = {
        // Datos base (anuncio)
        titulo: document.getElementById('v-titulo').value,
        descripcion: document.getElementById('v-descripcion').value,
        latitud: document.getElementById('v-latitud').value || null,
        longitud: document.getElementById('v-longitud').value || null,
        numero_telefono: document.getElementById('v-telefono').value,
        id_usuario: document.getElementById('v-usuario').value,
        id_categoria: document.getElementById('v-categoria').value,
        
        // Datos específicos (vehículo) principales
        precio: document.getElementById('v-precio').value || null,
        marca: document.getElementById('v-marca').value,
        modelo: document.getElementById('v-modelo').value,
        anio: document.getElementById('v-anio').value || null,
        categoria_vehiculo: document.getElementById('v-categoria-vehiculo').value,
        combustible: document.getElementById('v-combustible').value,
        puertas: document.getElementById('v-puertas').value || null,
        traccion: document.getElementById('v-traccion').value,
        color: document.getElementById('v-color').value,
        cilindrada: document.getElementById('v-cilindrada').value,
        kilometraje: document.getElementById('v-kilometraje').value || null,
        estado_vehiculo: document.getElementById('v-estado').value,

        // Equipamiento
        retrovisores_electricos: document.getElementById('v-retrovisores').checked,
        neblineros: document.getElementById('v-neblineros').checked,
        aire: document.getElementById('v-aire').checked,
        full_equipo: document.getElementById('v-full-equipo').checked,
        parlantes: document.getElementById('v-parlantes').checked,
        radio_cd: document.getElementById('v-radio-cd').checked,
        radio_mp3: document.getElementById('v-radio-mp3').checked,
        aros: document.getElementById('v-aros').checked,
        aros_aleacion: document.getElementById('v-aros-aleacion').checked,
        parrilla: document.getElementById('v-parrilla').checked,
        luces_alogenas: document.getElementById('v-luces-alogenas').checked,

        // Seguridad
        localizador_gps: document.getElementById('v-gps').checked,
        airbag: document.getElementById('v-airbag').checked,
        laminas_seguridad: document.getElementById('v-laminas').checked,
        blindado: document.getElementById('v-blindado').checked,
        faros_antiniebla_traseros: document.getElementById('v-faros-traseros').checked,
        faros_antiniebla_delanteros: document.getElementById('v-faros-delanteros').checked,
        inmovilizador_motor: document.getElementById('v-inmovilizador').checked,
        repartidor_electronico_frenado: document.getElementById('v-repartidor-frenado').checked,
        frenos_abs: document.getElementById('v-frenos-abs').checked,
        alarma: document.getElementById('v-alarma').checked,

        // Extras
        sunroof: document.getElementById('v-sunroof').checked,
        asientos_cuero: document.getElementById('v-asientos-cuero').checked,
        climatizador: document.getElementById('v-climatizador').checked
    };

    try {
        const res = await fetch(`${API_URL}/vehiculos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (res.ok) {
            alert('Vehículo creado con éxito');
            e.target.reset();
            loadVehiculos();
        } else {
            const err = await res.json();
            alert('Error al crear: ' + JSON.stringify(err));
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

async function deleteVehiculo(id) {
    if (!confirm('¿Seguro que quieres eliminar este vehículo? (También eliminará el anuncio asociado lógicamente)')) return;
    try {
        await fetch(`${API_URL}/vehiculos/${id}`, { method: 'DELETE' });
        loadVehiculos();
    } catch (error) {
        alert('Error al eliminar');
    }
}

// =======================
// IMÁGENES CRUD
// =======================
document.getElementById('form-imagen-upload').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const idAnuncio = document.getElementById('img-id-anuncio').value;
    const fileInput = document.getElementById('img-file');
    const resultDiv = document.getElementById('upload-result');
    
    if (fileInput.files.length === 0) return;

    const formData = new FormData();
    formData.append('imagen', fileInput.files[0]);

    try {
        resultDiv.innerText = 'Subiendo...';
        resultDiv.style.color = 'orange';

        const res = await fetch(`${API_URL}/anuncios/${idAnuncio}/imagenes`, {
            method: 'POST',
            body: formData
            // No enviar 'Content-Type' aquí, el navegador lo añade con el boundary adecuado para FormData
        });

        if (res.ok) {
            resultDiv.innerText = '✅ Imagen subida correctamente';
            resultDiv.style.color = 'green';
            e.target.reset();
        } else {
            const err = await res.json();
            resultDiv.innerText = '❌ Error: ' + JSON.stringify(err);
            resultDiv.style.color = 'red';
        }
    } catch (error) {
        resultDiv.innerText = '❌ Error: ' + error.message;
        resultDiv.style.color = 'red';
    }
});

document.getElementById('form-imagen-view').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const idAnuncio = document.getElementById('view-id-anuncio').value;
    const gallery = document.getElementById('gallery');
    
    gallery.innerHTML = '<p>Cargando...</p>';

    try {
        const res = await fetch(`${API_URL}/anuncios/${idAnuncio}/imagenes`);
        if (!res.ok) throw new Error('Error en respuesta de la API');
        
        const data = await res.json();
        gallery.innerHTML = '';

        if (!data || data.length === 0) {
            gallery.innerHTML = `<p style="grid-column: 1 / -1;">No hay imágenes para el anuncio ${idAnuncio}.</p>`;
            return;
        }

        data.forEach(img => {
            const container = document.createElement('div');
            container.style.border = '1px solid #ccc';
            container.style.padding = '5px';
            container.style.borderRadius = '5px';
            container.style.textAlign = 'center';

            const imageEl = document.createElement('img');
            // La URL ya viene con /uploads/... así que podemos usarla directamente si el HTML se sirve de raíz
            imageEl.src = img.url;
            imageEl.style.maxWidth = '100%';
            imageEl.style.height = 'auto';
            imageEl.style.display = 'block';

            const small = document.createElement('small');
            small.innerText = `ID Img: ${img.id_imagen}`;

            container.appendChild(imageEl);
            container.appendChild(small);
            gallery.appendChild(container);
        });

    } catch (error) {
        gallery.innerHTML = `<p style="grid-column: 1 / -1; color: red;">Error: ${error.message}</p>`;
    }
});

// Inicializar al cargar
window.onload = () => {
    // Comenzar en Auth por defecto ya está seleccionado por el HTML inicial (clase en btn)
};
