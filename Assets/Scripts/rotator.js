#pragma strict

var cam: Camera;
var mesh : Mesh;



function Start() {
	cam = GameObject.Find("MainCamera").GetComponent.<Camera>();

}

function Update () {
	mesh = GetComponent.<MeshFilter>().sharedMesh;
	transform.localScale = Vector3(Random.value, Random.value , Random.value );
	transform.position = Vector3(Random.value*1.8 + 1, Random.value + 1.5, Random.value - 1);
	transform.rotation = Random.rotation;


	Application.CaptureScreenshot("screenshots/Screenshot" + Time.time + ".png");
	var allVertices : Vector3[] = mesh.vertices;
	var points: Vector3[] = mesh.vertices;
	for(var g : int = 0; g < mesh.vertices.length; g++){
		allVertices[g] = Vector3.Scale((allVertices[g]), transform.lossyScale);
		allVertices[g] = transform.TransformDirection(allVertices[g]);
		Debug.DrawRay(transform.position, allVertices[g], Color.red);
		//Debug.DrawRay(transform.position, mesh.vertices[g], Color.blue);
		points[g] = transform.TransformPoint(mesh.vertices[g]);
	}
	var vertices = new Array();
	for(var i : int = 0; i < 8; i++){
		var dir : Vector3;
		dir = allVertices[i] + transform.position - cam.ViewportToWorldPoint(new Vector3(0.5, 0.5, 0));
		if(Physics.Raycast(cam.ViewportToWorldPoint(new Vector3(0.5, 0.5, 0)), dir));
		{
			var multhits: RaycastHit[];
			multhits = Physics.RaycastAll(cam.ViewportToWorldPoint(new Vector3(0.5, 0.5, 0)), dir);
			Debug.DrawRay(cam.ViewportToWorldPoint(new Vector3(0.5, 0.5, 0)), multhits[0].point - cam.ViewportToWorldPoint(new Vector3(0.5, 0.5, 0)), Color.green);
			var smallest : RaycastHit;
			var smallestdist : float = 1000000000.0;
			for(var y: int = 0; y < multhits.length; y++) {
				if(multhits[y].distance < smallestdist){
					smallest = multhits[y];
					smallestdist = multhits[y].distance;
				}
			}
			if(smallest.point == points[i]){
				vertices.push(points[i]);
			}
		}
	}

	var screenPos = new Array();
	for(var j : int = 0; j < vertices.length; j++){
		screenPos[j] = cam.WorldToScreenPoint(vertices[j]);
		Debug.Log(screenPos[j] + " screenPos");
	}
	System.IO.File.WriteAllText("text/Position" + Time.time + ".txt", screenPos.ToString());

	mesh.RecalculateBounds();
}