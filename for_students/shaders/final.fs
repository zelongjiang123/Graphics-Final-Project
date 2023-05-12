/* simple fragment shader
* makes a WORLD SPACE grating (spatial solid texture) that the object can move through
*/

varying vec3 v_xyz_world;
varying vec3 v_xyz_local;

void main()
{
   gl_FragColor = vec4( abs(sin(v_xyz_world.x * 3.141)),
                        abs(sin(v_xyz_world.y * 3.141)),
                        abs(sin(v_xyz_world.z * 3.141)),1);
}

