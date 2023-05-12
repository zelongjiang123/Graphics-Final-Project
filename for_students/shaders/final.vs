/* basic uniforms and attributes are 
 * provided by THREE: (see https://threejs.org/docs/#api/en/renderers/webgl/WebGLProgram)
 */
// uniform mat4 modelViewMatrix;
// uniform mat4 projectionMatrix;
// in vec3 position;

// create varying variables for both 5 variants of the fragment shader
// note this is a rare case where we do want the world position
varying vec3 v_xyz_world;
varying vec3 v_xyz_local;

void main() {
    // the main output of the shader (the vertex position)
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    v_xyz_local = position;
    v_xyz_world = (modelMatrix * vec4( position, 1.0 )).xyz;

}

